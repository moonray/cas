require 'capistrano/ext/multistage'
require 'net/ssh'

set :application, "cas"
set :repository,  "jmollica@git:/var/cache/git/cas.git"

set :stages, ["staging", "dev"]
set :default_stage, "dev"

set :scm, :git

set :ssh_options, {:forward_agent => true}
set :user, 'webadmin'
set :use_sudo, false
set :deploy_to, "/var/www/#{application}"

set :deploy_via, :remote_cache #checks out source code to cache copy
set :keep_releases, 5

# DRUPAL
set :shared_children, shared_children + %w{sites/default/files sites/default/settings.php}
set :download_Drush, false

set :drush_cmd, "drush"

set :drush_uri, "http://#{application}"

default_run_options[:pty] = true

after "deploy:restart", "deploy:cleanup"
#{}"deploy:drupal:clear_all_caches"

=begin

# DRUPAL
#set :app_path, ""
#set :shared_children, ['sites/default/files']
#set :shared_files, ['sites/default/settings.php']
#set :download_Drush, false

#role :db,  "your primary db-server here", :primary => true # This is where Rails migrations will run
#role :db,  "your slave db-server here"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:
# namespace :deploy do
#   task :start do ; end
#   task :stop do ; end
#   task :restart, :roles => :app, :except => { :no_release => true } do
#     run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
#   end
=end
# end
