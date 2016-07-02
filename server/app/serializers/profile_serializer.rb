class ProfileSerializer < BaseSerializer
  attributes :id,
             :first_name,
             :last_name,
             :phone_number,
             :email,
             :admin
end
