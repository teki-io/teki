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
  templates = []
  for index in 1..count
    templates << FactoryGirl.create(
      :shift_template,
      name: "#{index} shift",
      start_time: '13:00',
      end_time: '22:00',
      company: company
    )
  end
  templates
end

def create_shifts(employees, shift_template)
  (-35..100).each do |x|
    employee = employees.sample
    if Random.new.rand(4) < 3
      FactoryGirl.create(
        :shift,
        name: shift_template.name,
        user: employee,
        start_time: (DateTime.now + x).strftime('%FT') + shift_template.start_time.strftime('%H:%M'),
        end_time: (DateTime.now + x).strftime('%FT') + shift_template.end_time.strftime('%H:%M'),
        shift_template: shift_template
      )
    end
  end
end

company = FactoryGirl.create(:company, domain: 'test.com')

user = FactoryGirl.create(
  :user,
  :admin,
  email: 'user@test.com',
  password: '12345678',
  company: company
)

create_employees(10, company)
templates = create_shift_templates(5, company)
create_shifts([user], templates[0])

# Must keep
Wupee::NotificationType.create(name: 'user_has_been_assigned_shift')
