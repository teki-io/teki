
# ![](https://avatars1.githubusercontent.com/u/18756030?v=3&s=26) Teki
[![Stories in Ready](https://badge.waffle.io/teki-io/teki.png?label=ready&title=Ready)](https://waffle.io/teki-io/teki)
[![Circle CI](https://circleci.com/gh/teki-io/teki.svg?style=svg)](https://circleci.com/gh/teki-io/teki)

Teki is a modern open source employee scheduling software built on Angular 2 and Rails. It's currently under heavy development.

[![Throughput Graph](https://graphs.waffle.io/teki-io/teki/throughput.svg)](https://waffle.io/teki-io/teki/metrics/throughput)

Got a question? Send us a note a [neil@teki.io](neil@teki.io)



# Screen Shots

### Admin View (Scheduler)

![](https://cloud.githubusercontent.com/assets/746239/16719138/2ce912cc-46f5-11e6-8cec-10e75cfac9b7.png)

### Employee View

![](https://cloud.githubusercontent.com/assets/746239/16719133/20e58334-46f5-11e6-8ecf-8139020ce88e.png)


# Run Locally

```

# Start rails server
$ git clone https://github.com/teki-io/teki.git
$ cd teki/server
teki/server$ bundle install
teki/server$ rake db:create
teki/server$ rake db:migrate
teki/server$ rake db:seed
teki/server$ rails s

# Start
$ cd teki/client
teki/client$ npm install
teki/client$ npm start
# login with seed account: user@test.com / password: 12345678

```

# Features/Upcoming Features

- Scheduler
	- Manager to assign shifts to employees
- Shift Template
	- Manager to use basic shift template to automatically populate current shift calendar
- Availabilities
	- Employee to specify time preference
- Employee & Shift Statistics
	- Manager to see overall stats and hours summary from each employee and shift
- My Shcedule
	- Employee to see assigned shifts only in the calendar view
- Request
	- Employee to request shift swap with another colleague


# License

MIT

