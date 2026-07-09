//% color="#AA278D" weight=100
namespace RCcar {

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
        //% block="servo 2"
        Servo3
    }

    let servo1Pin = AnalogPin.P0;
    let servo2Pin = AnalogPin.P1;
    let servo3Pin = AnalogPin.P2;


    export enum Direction {
        //% block="forward"
        Forward,
        //% block="backward"
        Backward
    }


    // PWM pins
    let PWMA = DigitalPin.P8;
    let PWMB = DigitalPin.P16;


    //% block="set motor $motor $direction speed $speed"
    //% speed.min=0 speed.max=100
    export function setMotor(motor: Motor, direction: Direction, speed: number) {

        // snelheid begrenzen
        if (speed < 0) {
            speed = 0;
        }
        if (speed > 100) {
            speed = 100;
        }

        // 0-100 omzetten naar 0-1023 PWM
        let pwm = Math.map(speed, 0, 100, 0, 1023);


        if (motor == Motor.A) {
            // richting
            if (direction == Direction.Forward) {
                pins.digitalWritePin(DigitalPin.P12, 1);
                pins.digitalWritePin(DigitalPin.P13, 0);
            } else {
                pins.digitalWritePin(DigitalPin.P12, 0);
                pins.digitalWritePin(DigitalPin.P13, 1);
            }
            // snelheid
            pins.analogWritePin(PWMA, pwm);

        } else {
            // richting
            if (direction == Direction.Forward) {
                pins.digitalWritePin(DigitalPin.P14, 1);
                pins.digitalWritePin(DigitalPin.P15, 0);
            } else {
                pins.digitalWritePin(DigitalPin.P14, 0);
                pins.digitalWritePin(DigitalPin.P15, 1);
            }
            // snelheid
            pins.analogWritePin(PWMB, pwm);
        }
    }


    //% block="stop motor $motor"
    export function stopMotor(motor: Motor) {

        if (motor == Motor.A) {
            pins.analogWritePin(PWMA, 0);
        } else {
            pins.analogWritePin(PWMB, 0);
        }
    }

    //% block="set $servo angle $angle degrees"
    //% angle.min=0 angle.max=180
    export function setServo(servo: Servo, angle: number) {

        if (angle < 0) {
            angle = 0;
        }

        if (angle > 180) {
            angle = 180;
        }
        // 0-180 graden omzetten naar servo pulsbreedte
        // 500us = 0 graden
        // 2500us = 180 graden
        let pulse = Math.map(angle, 0, 180, 500, 2500);


        if (servo == Servo.Servo1) {
            pins.servoSetPulse(servo1Pin, pulse);
        }
        else if (servo == Servo.Servo2) {
            pins.servoSetPulse(servo2Pin, pulse);
        } else {
            pins.servoSetPulse(servo3Pin, pulse);
        }
    }

    //% block="set $servo to center"
    //% angle.min=0 angle.max=180
    export function centerServo(servo: Servo) {
        setServo(servo, 90);
    }
}
