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

def create_shift_templates(count, company)
  for index in 1..count
    FactoryGirl.create(
      :shift_template,
      name: "#{index} shift",
      start_time: '13:00',
      end_time: '22:00',
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
create_shift_templates(5, company)
