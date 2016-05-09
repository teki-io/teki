module Concerns::Queryable
  extend ActiveSupport::Concern

  class_methods do
    def query(*args)
      new(*args).query
    end
  end
end
