# Initial problems:

$ brew install imagemagick
It updated openssl to 1.1, that's where the troubles started. Ruby 2.3.8 depends on openssl 1.0.

$ RUBY_CONFIGURE_OPTS="--with-openssl-dir=/usr/local/opt/openssl" rvm reinstall ruby 2.3.8

did not work

$ brew install https://raw.githubusercontent.com/Homebrew/homebrew-core/64555220bfbf4a25598523c2e4d3a232560eaad7/Formula/openssl.rb -f

openssl is required by glib, imagemagick, libheif, mysql, mysql@5.7, postgresql, postgresql@10, python and shared-mime-info, which are currently installed.

forced reinstall of openssl, got to reinstall mysql at the very least. but right now reinstalling ruby 2.3.8

success.
$ bundle
Could not load OpenSSL.
You must recompile Ruby with OpenSSL support or change the sources in your Gemfile from 'https' to 'http'. Instructions for compiling with OpenSSL using RVM are available at
http://rvm.io/packages/openssl.

$ brew --prefix openssl
> /usr/local/opt/openssl@1.1

What.
OK trying again

$ brew uninstall --ignore-dependencies openssl

So my plan is to install openssl version 1.0, and

$ rvm install 2.3.8 --with-openssl-dir=/usr/local/opt/openssl

I did get this: No GPG software exists to validate rvm-installer, skipping.

$ bundle

got this again: You must recompile Ruby with OpenSSL support or change the sources in your Gemfile from 'https' to 'http'
So now I'm doing a stackoverflow thing, following instructions on rvm.com with autolibs.

$ rvm autolibs
$ rvm autolibs homebrew # turns out autolibs just installs the most recent version of openssl

Odd thing:
$ rvm info gives me information about a ruby I don't have (or didn't at the time) ruby 2.3.8.

Fucking every time I install it says
Error running 'env GEM_HOME=/ruby-2.3.8@global GEM_PATH= /Users/keichelm/.rvm/rubies/ruby-2.3.8/bin/ruby -d /Users/keichelm/.rvm/src/rubygems-3.0.6/setup.rb --no-document',
please read /Users/keichelm/.rvm/log/1580426118_ruby-2.3.8/rubygems.install.log
and I have to sudo chown -R keichelm ~/.rvm it's terrible

 So I tried running those commands one at a time. It didn't work, so 

$ .rvm implode

Go back to home directory. There are still references to .rvm everywhere. Notably, in these files:

 .zlogin, .zshrc, .profile

I removed those. They _only_ contained references to .rvm. I don't know how this happened, but I definitely didn't install .rvm properly.

Steps to try/ideas:

1. Going to run brew doctor
2. install rbenv and follow the instructions here: https://github.com/rbenv/ruby-build/issues/1353
3. Do this shit https://mentalized.net/journal/2019/09/13/ruby-2-3-rvm-and-openssl-1-0/

# Brew doctor
Stuff about unlinked files. $ brew uninstall postgresql, I don't need it.
$ brew uninstall imagemagick, fuck imagemagick.

When installing ruby should set PKG_CONFIG_PATH=/usr/local/Cellar/openssl/1.0.2t/lib/pkgconfig


