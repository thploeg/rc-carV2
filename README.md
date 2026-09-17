
> Open deze pagina op [https://thploeg.github.io/rc-carv2/](https://thploeg.github.io/rc-carv2/)

## Gebruiken als extensie

Deze repository kan worden toegevoegd als **extensie** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* klik op **Nieuw project**
* klik op **Extensies** onder het tandwielmenu
* zoeken naar **https://github.com/thploeg/rc-carv2** en importeren

## Dit project bewerken

Om deze repository te bewerken in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* klik op **Importeren** en klik vervolgens op **Importeer URL**
* plak **https://github.com/thploeg/rc-carv2** en klik op importeren

#### Metadata (gebruikt voor zoeken, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>




# RC Car V2 API documentation

MakeCode extension for controlling an RC car with a micro:bit.

## Blocks

### Drive

Controls the speed and direction of the car.

### Steering

Controls the steering servo.

### Stop

Stops the car.

## Installation

Open MakeCode for micro:bit and select:

Extensions → Search

Then enter:

https://github.com/thploeg/rc-carV2

## API

### `drive(speed: number)`

Drives the car at the specified speed.

### `steering(angle: number)`

Sets the steering angle.

### `stop()`

Stops the motors.

## License

MIT License
