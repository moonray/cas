#the git branch you want to use
 set :branch, "dev"

role :web, "www-dev" #www-dev                          # Your HTTP server, Apache/etc
role :app, "www-dev"                          # This may be the same as your `Web` server

