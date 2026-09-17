namespace MatThom {

    export enum Motor {
        //% block="A"
        A,
        //% block="B"
        B
    }

    export enum Servo {
        //% block="servo 1"
        Servo1,
        //% block="servo 2"
        Servo2,
        //% block="servo 3"
        Servo3
    }

    export enum Direction {
        //% block="forward"
        Forward,
        //% block="backward"
        Backward
    }

    // Servo pins
    let servo1Pin = AnalogPin.P0
    let servo2Pin = AnalogPin.P1
    let servo3Pin = AnalogPin.P2

    // Servo offsets
    let servo1Offset = 0
    let servo2Offset = 0
    let servo3Offset = 0

    // PWM pins
    let PWMA = DigitalPin.P8
    let PWMB = DigitalPin.P16

    //% block="set motor $motor $direction speed $speed"
    //% speed.min=0 speed.max=100
    //% group="Motors"
    export function setMotor(motor: Motor, direction: Direction, speed: number) {

        if (speed < 0) speed = 0
        if (speed > 100) speed = 100

        let pwm = Math.map(speed, 0, 100, 0, 1023)

        if (motor == Motor.A) {

            if (direction == Direction.Forward) {
                pins.digitalWritePin(DigitalPin.P12, 1)
                pins.digitalWritePin(DigitalPin.P13, 0)
            } else {
                pins.digitalWritePin(DigitalPin.P12, 0)
                pins.digitalWritePin(DigitalPin.P13, 1)
            }

            pins.analogWritePin(PWMA, pwm)

        } else {

            if (direction == Direction.Forward) {
                pins.digitalWritePin(DigitalPin.P14, 1)
                pins.digitalWritePin(DigitalPin.P15, 0)
            } else {
                pins.digitalWritePin(DigitalPin.P14, 0)
                pins.digitalWritePin(DigitalPin.P15, 1)
            }

            pins.analogWritePin(PWMB, pwm)
        }
    }

    //% block="stop motor $motor"
    //% group="Motors"
    export function stopMotor(motor: Motor) {

        if (motor == Motor.A) {
            pins.analogWritePin(PWMA, 0)
        } else {
            pins.analogWritePin(PWMB, 0)
        }
    }

    //% block="set $servo offset to $offset °"
    //% offset.min=-90 offset.max=90
    //% group="Servos"
    export function setServoOffset(servo: Servo, offset: number) {

        if (servo == Servo.Servo1) {
            servo1Offset = offset
        } else if (servo == Servo.Servo2) {
            servo2Offset = offset
        } else {
            servo3Offset = offset
        }
    }

    //% block="set $servo angle $angle °"
    //% angle.min=0 angle.max=180
    //% group="Servos"
    export function setServo(servo: Servo, angle: number) {
        let offset = 0
        if (servo == Servo.Servo1) {
            offset = servo1Offset
        } else if (servo == Servo.Servo2) {
            offset = servo2Offset
        } else {
            offset = servo3Offset
        }

        angle += offset

        if (angle < 0) angle = 0
        if (angle > 180) angle = 180

        // 500µs = 0°
        // 2500µs = 180°
        let pulse = Math.map(angle, 0, 180, 500, 2500)

        if (servo == Servo.Servo1) {
            pins.servoSetPulse(servo1Pin, pulse)
        } else if (servo == Servo.Servo2) {
            pins.servoSetPulse(servo2Pin, pulse)
        } else {
            pins.servoSetPulse(servo3Pin, pulse)
        }
    }

    //% block="set $servo to center"
    //% group="Servos"
    export function centerServo(servo: Servo) {
        setServo(servo, 90)
    }
}
