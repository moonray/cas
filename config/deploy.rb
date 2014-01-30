require 'capistrano/ext/multistage'
require 'net/ssh'

set :application, "cas"
set :repository,  "deploy@git:/var/cache/git/cas.git"

set :stages, ["staging", "dev"]
set :default_stage, "dev"

set :scm, :git

set :ssh_options, {:forward_agent => true}
set :user, 'deploy'
set :use_sudo, false
set :deploy_to, "/var/www/#{application}"

set :deploy_via, :remote_cache #checks out source code to cache copy
set :keep_releases, 5

# DRUPAL
set :shared_children, shared_children + %w{sites/default/files sites/default/settings.php}
set :download_Drush, false

set :drush_cmd, "drush"

set :drush_uri, "http://#{application}"


set :deploy_to, "/var/www/#{application}"
set :app_path, "#{deploy_to}/current/"

set :share_path, "#{deploy_to}/shared"

default_run_options[:pty] = true

after 'deploy:restart', 'deploy:cleanup', 'deploy:drupal:link_filesystem', 'deploy:drupal:clear_all_caches'

namespace :deploy do
  task :start do ; end
  task :stop do ; end
  task :restart, :roles => :app, :except => { :no_release => true } do
    #Place holder for app restart - in Ruby apps this would touch restart.txt.
  end

  #Drupal application and project specific tasks.
  namespace :drupal do

    desc "Perform a Drupal application deploy."
    task :default, :roles => :app, :except => { :no_release => true } do
      site_offline
      clear_all_caches
      backupdb
      deploy.default
      link_filesystem
      updatedb
      site_online
    end

    desc "Place site in maintenance mode."
    task :site_offline, :roles => :app, :except => { :no_release => true } do
      run "#{drush_cmd} -r #{app_path} vset maintenance_mode 1 -y"
    end

    desc "Bring site back online."
    task :site_online, :roles => :app, :except => { :no_release => true } do
       run "#{drush_cmd} -r #{app_path} vset maintenance_mode 0 -y"
    end

    desc "Run Drupal database migrations if required."
    task :updatedb, :on_error => :continue do
      run "#{drush_cmd} -r #{app_path} updatedb -y"
    end

    desc "Backup the database."
    task :backupdb, :on_error => :continue do
      run "#{drush_cmd} -r #{app_path} sql-dump --result-file=#{deploy_to}/backup/release-drupal-db.sql"
      #run "#{drush_cmd} -r #{app_path} bam-backup"
    end

    #desc "This should not be run on its own - so comment out the description.
    # "Recreate the required Drupal symlinks to static directories and clear all caches."
    task :link_filesystem, :roles => :app, :except => { :no_release => true } do
      commands = []
      commands << "mkdir -p #{app_path}/sites/default"
      commands << "ln -nfs #{share_path}/settings.php #{app_path}/sites/default/settings.php"
      commands << "ln -nfs #{share_path}/files #{app_path}/sites/default/files"
      commands << "ln -nfs #{share_path}/tmp #{app_path}/sites/default/tmp"
      commands << "ln -nfs #{share_path}/cache #{app_path}/cache"
      commands << "find #{app_path} -type d -print0 | xargs -0 chmod 755"
      commands << "find #{app_path} -type f -print0 | xargs -0 chmod 644"
      run commands.join(' && ') if commands.any?
    end

    desc "Clear all caches"
    task :clear_all_caches, :roles => :app, :except => { :no_release => true } do
      run "#{drush_cmd} -r #{app_path} --uri=#{drush_uri} cc all"
    end
  end
end
