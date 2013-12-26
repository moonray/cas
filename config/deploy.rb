require 'capistrano/ext/multistage'
require 'net/ssh'

set :stages, ["staging", "dev"]
set :default_stage, "dev"



=begin
require 'capistrano/ext/multistage'
require 'net/ssh'

#set :stages, ["dev","stage"]
#set :default_stage, "dev"

set :application, "cas"
set :user, 'webadmin'
set :deploy_to, "/var/www/#{application}"

# DRUPAL
#set :app_path, ""
#set :shared_children, ['sites/default/files']
#set :shared_files, ['sites/default/settings.php']
#set :download_Drush, false

set :scm, :git
set :repository,  "jmollica@git.calacademy.org:/var/git/cache/cas.git"

set :use_sudo, false
default_run_options[:pty] = true
set :ssh_options, {:forward_agent => true}
set :deploy_via, :remote_cache #checks out source code to cache copy

set :keep_releases, 5
after "deploy:update", "deploy:cleanup"


# set :scm, :git # You can set :scm explicitly or Capistrano will make an intelligent guess based on known version control directory names
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

role :web, "www-dev"                          # Your HTTP server, Apache/etc
role :app, "www-dev"                          # This may be the same as your `Web` server
#role :db,  "your primary db-server here", :primary => true # This is where Rails migrations will run
#role :db,  "your slave db-server here"

# if you want to clean up old releases on each deploy uncomment this:
#after "deploy:restart", "deploy:cleanup"

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
