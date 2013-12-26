#the git branch you want to use
# set :branch, "dev"

#the domain and path to app directory
#set :domain, "www-dev.calacademy.org"
#set :deploy_to, "/var/www/#{application}"


set :application, "cas"
set :repository,  "jmollica@git:/var/cache/git/cas.git"
#set :repository,  "jmollica@10.1.10.132:/var/cache/git/silver.git"

set :scm, :git
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

set :ssh_options, {:forward_agent => true}
set :user, 'webadmin'
set :use_sudo, false
set :deploy_to, "/var/www/#{application}"
set :deploy_via, :remote_cache #checks out source code to cache copy
set :keep_releases, 5
after "deploy:restart", "deploy:cleanup"

default_run_options[:pty] = true

role :web, "www-dev" #www-dev                          # Your HTTP server, Apache/etc
role :app, "www-dev"                          # This may be the same as your `Web` server

#role :web, "10.1.10.115" #www-dev                          # Your HTTP server, Apache/etc
#role :app, "10.1.10.115"                          # This may be the same as your `Web` server
#role :db,  "10.1.10.115", :primary => true # This is where Rails migrations will run

# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"
