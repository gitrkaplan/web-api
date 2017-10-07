const sportsCar = document.createElement('img')
sportsCar.setAttribute('src', 'car.png')
sportsCar.setAttribute('id', 'car')

const road = document.createElement('div')
road.setAttribute('id', 'road')

document.body.appendChild(road)
road.appendChild(sportsCar)

document.addEventListener('keydown', onKeyDown, false)

let intervalId = null

const rotations = {
  north: 0,
  east: 90,
  south: 180,
  west: 270
}

class Car {
  constructor(carType, direction, speed, location) {
    this.direction = direction
    this.speed = speed
    this.location = location
    const [x, y] = location
    carType.style.left = x + 'px'
    carType.style.top = y + 'px'
    carType.style.transform = 'rotate(' + rotations[direction] + 'deg)'
  }
  static start(car) {
    intervalId = setInterval(function () {
      car.move()
    }, 16)
  }
  turn(direction) {
    this.direction = direction
    this.style.transform = 'rotate(' + rotations[direction] + 'deg)'
  }
  accelerate(amount) {
    this.speed = amount
  }
  move() {
    switch (this.direction) {
      case 'South':
        this.location[1] += this.speed
        break
      case 'North':
        this.location[1] -= this.speed
        break
      case 'East':
        this.location[0] += this.speed
        break
      case 'West':
        this.location[0] -= this.speed
    }
    sportsCar.style.left = this.location[0] + 'px'
    sportsCar.style.top = this.location[1] + 'px'
  }
}

function onKeyDown(event) {
  var keyCode = event.keyCode
  switch (keyCode) {
    case 68:
      keyD = true
      console.log('D')
      break
    case 83:
      keyS = true
      console.log('S')
      break
    case 65:
      keyA = true
      console.log('A')
      break
    case 87:
      keyW = true
      console.log('W')
      break
    case 32:
      space = true
      startCar()
  }
}

function startCar() {
  if (intervalId === null) {
    Car.start(porsche)
    console.log('Car started!')
  }
  else {
    clearInterval(intervalId)
    intervalId = null
    console.log('Car stopping.')
  }
}

const porsche = new Car(sportsCar, 'South', 5, [0, 0])

window.onload = function () {
  alert('Start your car using the "space bar"!')
}
