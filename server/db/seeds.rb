def create_employees(count, company)
  for index in 1..count
    FactoryGirl.create(
        :user,
        email: "user#{index}@#{company.domain}",
        password: '12345678',
        company: company
    )
  end
end

company = FactoryGirl.create(:company, domain: 'test.com')

FactoryGirl.create(
  :user,
  :admin,
  email: 'user@test.com',
  password: '12345678',
  company: company
)

create_employees(10, company)
