FactoryGirl.define do
  factory :company do
    name   { Faker::Name.first_name }
    domain { Faker::Internet.domain_name }
  end
end
