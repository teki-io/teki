require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Server
  class Application < Rails::Application
    if Rails.env.development?
      config.middleware.insert_before 0, Rack::Cors do
        allow do
          origins '*'
          resource '*', :headers => :any, :methods => [:get, :post, :options, :put, :delete]
        end
      end
    end
  end
end
