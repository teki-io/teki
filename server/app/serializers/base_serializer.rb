class BaseSerializer < ActiveModel::Serializer
  def key_format
    :lower_camel
  end

  private

  def camelize_keys_for(hash)
    hash.deep_transform_keys { |key| key.to_s.camelize(:lower).to_sym }
  end
end
