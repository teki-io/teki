class QueryBase
  include Concerns::Queryable

  attr_reader :scope, :params

  def initialize(scope, params = {})
    @scope = scope
    @params = params
  end

  def query
    raise NotImplementedError
  end

  def with_params
    !params.empty?
  end
end
