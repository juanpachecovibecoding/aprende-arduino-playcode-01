var l = [
    [`Microcontroller`, `ATmega328P`],
    [`Operating voltage`, `5 V`],
    [`Input voltage`, `7–12 V`],
    [`Digital I/O pins`, `14 (6 PWM)`],
    [`Analog inputs`, `6`],
    [`Flash memory`, `32 KB`],
    [`SRAM / EEPROM`, `2 KB / 1 KB`],
    [`Clock speed`, `16 MHz`],
    [`Size`, `68.6 × 53.4 mm`],
  ],
  u = {
    key: `color`,
    part: `led`,
    label: `Colour`,
    type: `swatch`,
    value: `red`,
    options: [
      { value: `red`, label: `Red`, color: `#e8392e` },
      { value: `yellow`, label: `Yellow`, color: `#f2c23a` },
      { value: `green`, label: `Green`, color: `#3fbf6a` },
      { value: `blue`, label: `Blue`, color: `#3d7be0` },
      { value: `white`, label: `White`, color: `#f2efe6` },
    ],
  },
  d = [
    {
      key: `obstacle`,
      part: `obstacle`,
      label: `Obstacle`,
      type: `choice`,
      value: `car`,
      options: [
        { value: `car`, label: `Car` },
        { value: `box`, label: `Box` },
        { value: `ball`, label: `Ball` },
        { value: `wall`, label: `Wall` },
      ],
    },
    {
      key: `gap`,
      part: `obstacle`,
      label: `Distance`,
      type: `range`,
      min: 5,
      max: 50,
      step: 1,
      value: 30,
      unit: `cm`,
    },
    {
      key: `sweep`,
      part: `obstacle`,
      label: `Drive back and forth while running`,
      type: `toggle`,
      value: !0,
    },
  ],
  f = {
    purple: { rgb: [170, 0, 255], color: `#a43cf0`, label: `Purple` },
    pink: { rgb: [255, 30, 110], color: `#f2457f`, label: `Pink` },
    orange: { rgb: [255, 90, 0], color: `#f57a1f`, label: `Orange` },
    yellow: { rgb: [255, 190, 0], color: `#f5c330`, label: `Yellow` },
    teal: { rgb: [0, 200, 150], color: `#1fbf98`, label: `Teal` },
    white: { rgb: [255, 255, 255], color: `#f4f0e8`, label: `White` },
  },
  p = {
    scale: [262, 294, 330, 349, 392, 440, 494, 523],
    twinkle: [
      262, 262, 392, 392, 440, 440, 392, 349, 349, 330, 330, 294, 294, 262,
    ],
    ode: [
      330, 330, 349, 392, 392, 349, 330, 294, 262, 262, 294, 330, 330, 294, 294,
    ],
  },
  m = {
    scale: [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
      [5, 1],
      [6, 1],
      [7, 2],
      [6, 1],
      [5, 1],
      [4, 1],
      [3, 1],
      [2, 1],
      [1, 1],
      [0, 2],
    ],
    twinkle: [
      [0, 1],
      [0, 1],
      [4, 1],
      [4, 1],
      [5, 1],
      [5, 1],
      [4, 2],
      [3, 1],
      [3, 1],
      [2, 1],
      [2, 1],
      [1, 1],
      [1, 1],
      [0, 2],
    ],
    ode: [
      [2, 1],
      [2, 1],
      [3, 1],
      [4, 1],
      [4, 1],
      [3, 1],
      [2, 1],
      [1, 1],
      [0, 1],
      [0, 1],
      [1, 1],
      [2, 1],
      [2, 1.5],
      [1, 0.5],
      [1, 2],
    ],
  };
function h(e, t) {
  let n = [];
  for (let r = 0; r < e.length; r += t)
    n.push(`  ${e.slice(r, r + t).join(`, `)}`);
  return `int melody[] = {\n${n.join(`,
`)}\n};`;
}
var ee = [
  {
    id: `board`,
    title: `Meet the board`,
    cardTitle: `1. Meet the<br />board`,
    thumb: `board`,
    heading: `Arduino Uno`,
    lede: `The Arduino Uno is a popular microcontroller board based on the ATmega328P. It’s easy to use and perfect for learning electronics, programming, and prototyping.`,
    features: [
      [`chip`, `Open-source hardware`],
      [`bulb`, `Wide community support`],
      [
        `gear`,
        `Used in education, hobby projects, and<br />real-world applications`,
      ],
    ],
    pinout: [
      [
        `D0–D13`,
        `Digital I/O`,
        `Read buttons, drive LEDs. ~3, 5, 6, 9, 10, 11 do PWM.`,
        `#2a56a3`,
      ],
      [`A0–A5`, `Analog in`, `10-bit readings, 0–1023 for 0–5 V.`, `#1aa3a1`],
      [
        `5V · 3.3V`,
        `Power out`,
        `Regulated supply for sensors and modules.`,
        `#d64a3a`,
      ],
      [`GND`, `Ground`, `Every circuit returns here.`, `#2f3547`],
      [`VIN`, `Power in`, `Raw jack voltage, 7–12 V.`, `#c0652d`],
      [`RESET`, `Reset`, `Pull LOW to restart the sketch.`, `#8e9094`],
    ],
    example: [
      `<code>setup()</code> runs once when the board powers up or resets.`,
      `<code>pinMode(LED_BUILTIN, OUTPUT)</code> makes pin 13 — wired to the on-board “L” LED — an output.`,
      `<code>loop()</code> then repeats forever. <code>digitalWrite(…, HIGH)</code> puts 5 V on the pin and lights the LED.`,
      `Press <b>Run</b> to upload: watch TX/RX flicker, then the L LED come on. Click any part to learn what it does.`,
    ],
    specs: l,
    params: [],
    code: `void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
}`,
    callouts: [
      {
        anchor: `usb`,
        icon: `usb`,
        tall: !0,
        title: `USB Port`,
        body: `Connects to your computer<br />for programming and power.`,
        x: -498,
        y: -314,
        w: 275,
        side: `bottom`,
        at: 131,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `mcu`,
        via: `mcuWay`,
        icon: `chip`,
        title: `Microcontroller`,
        body: `ATmega328P runs<br />your code.`,
        x: -112,
        y: -347,
        w: 268,
        side: `bottom`,
        at: 84,
      },
      {
        anchor: `digital`,
        icon: `pins`,
        title: `Digital Pins`,
        body: `Pins 0–13 for digital<br />input/output.<br />(~ PWM on some pins)`,
        x: 263,
        y: -301,
        w: 255,
        side: `left`,
        at: 59,
        leg: 36,
        approach: `above`,
      },
      {
        anchor: `jack`,
        icon: `bolt`,
        title: `Power Jack`,
        body: `External DC power<br />(7–12V recommended).`,
        x: -498,
        y: 125,
        w: 253,
        side: `top`,
        at: 89,
        leg: 48,
        ring: !0,
      },
      {
        anchor: `power`,
        icon: `plug`,
        title: `Power Pins`,
        body: `5V, 3.3V, GND and<br />VIN for power.`,
        x: -198,
        y: 195,
        w: 225,
        side: `top`,
        at: 75,
        leg: 32,
        ring: !0,
      },
      {
        anchor: `analog`,
        icon: `wave`,
        wide: !0,
        title: `Analog Pins`,
        body: `A0–A5 for reading<br />analog signals.`,
        x: 270,
        y: 183,
        w: 223,
        side: `left`,
        at: 54,
        leg: 46,
        ring: !0,
      },
    ],
    sim: `builtin`,
  },
  {
    id: `blink`,
    title: `Blink an LED`,
    cardTitle: `2. Blink an LED`,
    thumb: `led`,
    heading: `Blink an LED`,
    lede: `Your first circuit: an LED and a resistor on a breadboard, driven by pin 13. Switching the pin on and off with a pause in between makes it blink.`,
    features: [
      [`pin`, `Digital output with <code>digitalWrite()</code>`],
      [`resistor`, `Click the resistor to try other values`],
      [`clock`, `Click the LED to change its colour and timing`],
    ],
    pinout: [
      [
        `D13`,
        `Resistor → LED (+)`,
        `The sketch switches this pin HIGH and LOW.`,
        `#f0a53a`,
      ],
      [
        `GND`,
        `LED (−)`,
        `The short leg returns current to the board.`,
        `#2f3547`,
      ],
    ],
    example: [
      `<code>const int LED_PIN = 13;</code> gives the pin a readable name.`,
      `In <code>setup()</code>, <code>pinMode(LED_PIN, OUTPUT)</code> lets the pin drive current.`,
      `<code>loop()</code> writes HIGH, waits, writes LOW, waits again. The two delays set the rhythm.`,
      `A bigger resistor lets less current through: try 10 kΩ and watch the LED dim.`,
    ],
    specs: [
      [`LED`, `5 mm, 1.8–3.2 V forward`],
      [`Max current`, `20 mA`],
      [`Resistor`, `220 Ω (red-red-brown)`],
      [`LED current`, `≈ (5 − 2) ÷ 220 ≈ 14 mA`],
      [`Pin 13 limit`, `40 mA absolute max`],
    ],
    params: [
      u,
      {
        key: `on`,
        part: `led`,
        label: `On for`,
        type: `range`,
        min: 50,
        max: 2e3,
        step: 50,
        value: 500,
        unit: `ms`,
      },
      {
        key: `off`,
        part: `led`,
        label: `Off for`,
        type: `range`,
        min: 50,
        max: 2e3,
        step: 50,
        value: 500,
        unit: `ms`,
      },
      {
        key: `ohms`,
        part: `resistor`,
        label: `Resistance`,
        type: `choice`,
        value: 220,
        options: [
          { value: 220, label: `220 Ω`, note: `About 14 mA: bright and safe.` },
          { value: 1e3, label: `1 kΩ`, note: `About 3 mA: noticeably dimmer.` },
          { value: 1e4, label: `10 kΩ`, note: `About 0.3 mA: barely glowing.` },
        ],
      },
    ],
    code: `const int LED_PIN = 13;

void setup() {
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_PIN, HIGH);
  delay({{on}});
  digitalWrite(LED_PIN, LOW);
  delay({{off}});
}`,
    callouts: [
      {
        anchor: `part:led`,
        icon: `led`,
        title: `LED`,
        body: `Lights up whenever pin 13 goes HIGH.`,
        x: 290,
        y: -350,
        w: 238,
        side: `bottom`,
        at: 40,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `pin:D13`,
        icon: `pin`,
        title: `Pin 13`,
        body: `Your sketch switches it HIGH and LOW.`,
        x: -162,
        y: -350,
        w: 250,
        side: `bottom`,
        at: 40,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `pin:GND`,
        icon: `ground`,
        title: `GND`,
        body: `The short leg (−) returns current here.`,
        x: -498,
        y: -330,
        w: 236,
        side: `right`,
        at: 46,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `part:resistor`,
        icon: `resistor`,
        wide: !0,
        title: `Resistor`,
        body: `Stops the LED drawing too much current.`,
        x: 270,
        y: 160,
        w: 238,
        side: `left`,
        at: 46,
        leg: 40,
        ring: !0,
      },
      {
        anchor: `ledL`,
        icon: `bulb`,
        title: `Built-in LED`,
        body: `The “L” LED mirrors pin 13 on the board.`,
        x: -498,
        y: 130,
        w: 250,
        side: `top`,
        at: 150,
        leg: 40,
        ring: !0,
      },
    ],
    sim: `blink`,
  },
  {
    id: `button`,
    title: `Push a button`,
    cardTitle: `3. Push a button`,
    thumb: `button`,
    heading: `Push a button`,
    lede: `Inputs let the board sense the world. A push button connects pin 2 to 5 V while you hold it; a pull-down resistor keeps the pin at 0 V when you let go.`,
    features: [
      [`button`, `Click and hold the button in the scene`],
      [`pin`, `Read a pin with <code>digitalRead()</code>`],
      [`logic`, `Switch between “hold” and “toggle” logic`],
    ],
    pinout: [
      [`5V`, `Button (left)`, `One side of the switch.`, `#d64a3a`],
      [
        `D2`,
        `Button (right) + 10 kΩ`,
        `Reads HIGH while the button is held.`,
        `#3d6fc4`,
      ],
      [
        `GND`,
        `10 kΩ pull-down`,
        `Pulls D2 LOW when the button is up.`,
        `#2f3547`,
      ],
      [`D13`, `220 Ω → LED`, `The output you control.`, `#f0a53a`],
    ],
    example: [
      `<code>pinMode(BUTTON, INPUT)</code> makes pin 2 listen instead of drive.`,
      `<code>digitalRead(BUTTON)</code> returns HIGH while the button is down, LOW otherwise.`,
      `In <b>hold</b> mode the LED simply copies the button.`,
      `In <b>toggle</b> mode the sketch remembers the last reading and flips the LED on each new press.`,
    ],
    specs: [
      [`Button`, `12 mm tactile switch`],
      [`Pull-down`, `10 kΩ to GND`],
      [`Logic levels`, `LOW < 1.5 V, HIGH > 3 V`],
      [`Bounce`, `Contacts chatter for ~5 ms`],
      [`Tip`, `<code>INPUT_PULLUP</code> needs no resistor`],
    ],
    params: [
      {
        key: `mode`,
        part: `button`,
        label: `Logic`,
        type: `choice`,
        value: `hold`,
        options: [
          {
            value: `hold`,
            label: `Hold`,
            note: `The LED is on only while you hold the button.`,
            code: {
              globals: ``,
              logic: `  int pressed = digitalRead(BUTTON);
  digitalWrite(LED, pressed);`,
            },
          },
          {
            value: `toggle`,
            label: `Toggle`,
            note: `Each press flips the LED on or off.`,
            code: {
              globals: `
int last = LOW;
bool lit = false;
`,
              logic: `  int now = digitalRead(BUTTON);
  if (now == HIGH && last == LOW) {
    lit = !lit;
    digitalWrite(LED, lit);
    delay(30);  // debounce
  }
  last = now;`,
            },
          },
        ],
      },
      u,
    ],
    code: `const int BUTTON = 2;
const int LED = 13;
{{mode.globals}}
void setup() {
  pinMode(BUTTON, INPUT);
  pinMode(LED, OUTPUT);
}

void loop() {
{{mode.logic}}
}`,
    callouts: [
      {
        anchor: `part:button`,
        icon: `button`,
        title: `Push Button`,
        body: `Click and hold it — pin 2 reads HIGH.`,
        x: -162,
        y: -350,
        w: 256,
        side: `bottom`,
        at: 200,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `part:pulldown`,
        icon: `resistor`,
        wide: !0,
        title: `Pull-down`,
        body: `10 kΩ keeps pin 2 LOW when released.`,
        x: 270,
        y: 160,
        w: 238,
        side: `left`,
        at: 46,
        leg: 40,
        ring: !0,
      },
      {
        anchor: `part:led`,
        icon: `led`,
        title: `LED`,
        body: `Your sketch decides when it lights.`,
        x: 290,
        y: -350,
        w: 238,
        side: `bottom`,
        at: 40,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `pin:D2`,
        icon: `pin`,
        title: `Pin 2 (input)`,
        body: `<code>digitalRead()</code> sees HIGH or LOW.`,
        x: -498,
        y: 130,
        w: 250,
        side: `top`,
        at: 150,
        leg: 40,
        ring: !0,
      },
    ],
    sim: `button`,
  },
  {
    id: `knob`,
    title: `Turn a knob`,
    cardTitle: `4. Turn a knob`,
    thumb: `pot`,
    heading: `Turn a knob`,
    lede: `A potentiometer is a resistor with a slider. Turning the knob moves the middle leg anywhere from 0 V to 5 V, and an analog pin turns that into a number.`,
    features: [
      [`knob`, `Drag around the knob to turn it`],
      [`wave`, `<code>analogRead()</code> gives 0–1023`],
      [`pwm`, `<code>analogWrite()</code> dims the LED, 0–255`],
    ],
    pinout: [
      [`5V`, `Pot (left)`, `Top of the voltage divider.`, `#d64a3a`],
      [`A0`, `Pot (middle)`, `The wiper: 0–5 V as you turn.`, `#3fae6a`],
      [`GND`, `Pot (right)`, `Bottom of the divider.`, `#2f3547`],
      [`~D9`, `220 Ω → LED`, `PWM output sets the brightness.`, `#f0a53a`],
    ],
    example: [
      `<code>analogRead(POT)</code> measures the wiper voltage: 0 V is 0, 5 V is 1023.`,
      `PWM only goes up to 255, so <code>value / 4</code> scales the reading to fit.`,
      `<code>analogWrite(LED, …)</code> pulses pin 9 so fast the LED looks dimmed.`,
      `Open the serial monitor (press Run) to watch the numbers as you turn.`,
    ],
    specs: [
      [`Potentiometer`, `10 kΩ linear, 270° travel`],
      [`ADC`, `10-bit, 0–1023`],
      [`Resolution`, `≈ 4.9 mV per step`],
      [`PWM`, `8-bit, 0–255 at ~490 Hz`],
      [`Read time`, `≈ 100 µs per <code>analogRead()</code>`],
    ],
    params: [
      {
        key: `pot`,
        part: `pot`,
        label: `Knob position`,
        type: `range`,
        min: 0,
        max: 1023,
        step: 1,
        value: 620,
      },
      u,
    ],
    code: `const int POT = A0;
const int LED = 9;

void setup() {
  Serial.begin(9600);
  pinMode(LED, OUTPUT);
}

void loop() {
  int value = analogRead(POT);  // 0-1023
  analogWrite(LED, value / 4);  // 0-255
  Serial.println(value);
  delay(50);
}`,
    callouts: [
      {
        anchor: `part:pot`,
        icon: `knob`,
        title: `Potentiometer`,
        body: `Drag around the knob to turn it.`,
        x: -162,
        y: -350,
        w: 252,
        side: `bottom`,
        at: 200,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `pin:A0`,
        icon: `wave`,
        wide: !0,
        title: `Pin A0`,
        body: `Reads the knob as a number, 0–1023.`,
        x: -498,
        y: 130,
        w: 252,
        side: `top`,
        at: 150,
        leg: 40,
        ring: !0,
      },
      {
        anchor: `part:led`,
        icon: `led`,
        title: `LED`,
        body: `Brightness follows the knob.`,
        x: 290,
        y: -350,
        w: 238,
        side: `bottom`,
        at: 40,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `pin:D9`,
        icon: `pwm`,
        wide: !0,
        title: `Pin ~9 (PWM)`,
        body: `Dims the LED with fast pulses.`,
        x: 270,
        y: 160,
        w: 238,
        side: `left`,
        at: 46,
        leg: 40,
        ring: !0,
      },
    ],
    sim: `knob`,
  },
  {
    id: `rgb`,
    title: `Mix colours`,
    cardTitle: `5. Mix colours`,
    thumb: `rgb`,
    heading: `Mix colours`,
    lede: `An RGB LED is three LEDs — red, green and blue — under one milky lens. Dim each one with PWM and the light blends into almost any colour you like.`,
    features: [
      [`pwm`, `One PWM pin per colour, 0–255 each`],
      [`bulb`, `Light mixes: red + green makes yellow`],
      [`led`, `Click the LED to mix your own colour`],
    ],
    pinout: [
      [`~D9`, `220 Ω → Red leg`, `Brightness of the red LED.`, `#ee7f62`],
      [`~D10`, `220 Ω → Green leg`, `Brightness of the green LED.`, `#3fae6a`],
      [`~D11`, `220 Ω → Blue leg`, `Brightness of the blue LED.`, `#3d6fc4`],
      [`GND`, `Common (longest leg)`, `All three LEDs return here.`, `#2f3547`],
    ],
    example: [
      `Pins <code>9</code>, <code>10</code> and <code>11</code> all support PWM, so each colour can be dimmed on its own.`,
      `<code>analogWrite(RED, 170)</code> runs the red LED at 170 out of 255 — about two-thirds brightness.`,
      `Mixing happens in your eye: red and blue together look purple, all three at 255 look white.`,
      `Each colour gets its own 220 Ω resistor, so no single LED draws too much current.`,
    ],
    specs: [
      [`LED`, `5 mm RGB, common cathode`],
      [`Forward voltage`, `R 2.0 V · G 3.0 V · B 3.0 V`],
      [`Resistors`, `3 × 220 Ω`],
      [`Colours`, `256³ ≈ 16.7 million`],
      [`PWM pins used`, `~9, ~10, ~11`],
    ],
    params: [
      {
        key: `preset`,
        part: `rgb`,
        label: `Presets`,
        type: `swatch`,
        value: `purple`,
        options: Object.entries(f).map(([e, t]) => ({
          value: e,
          label: t.label,
          color: t.color,
        })),
      },
      {
        key: `r`,
        part: `rgb`,
        label: `Red`,
        type: `range`,
        min: 0,
        max: 255,
        step: 1,
        value: 170,
        tint: `#e8392e`,
      },
      {
        key: `g`,
        part: `rgb`,
        label: `Green`,
        type: `range`,
        min: 0,
        max: 255,
        step: 1,
        value: 0,
        tint: `#3fbf6a`,
      },
      {
        key: `b`,
        part: `rgb`,
        label: `Blue`,
        type: `range`,
        min: 0,
        max: 255,
        step: 1,
        value: 255,
        tint: `#3d7be0`,
      },
    ],
    constrain(e, t) {
      let n = f[e.preset];
      t === `preset` && n
        ? ([e.r, e.g, e.b] = n.rgb)
        : (e.preset =
            Object.keys(f).find((t) =>
              f[t].rgb.every((t, n) => t === [e.r, e.g, e.b][n]),
            ) ?? `custom`);
    },
    code: `const int RED = 9;
const int GREEN = 10;
const int BLUE = 11;

void setup() {
  pinMode(RED, OUTPUT);
  pinMode(GREEN, OUTPUT);
  pinMode(BLUE, OUTPUT);
}

void loop() {
  analogWrite(RED, {{r}});
  analogWrite(GREEN, {{g}});
  analogWrite(BLUE, {{b}});
  delay(100);
}`,
    callouts: [
      {
        anchor: `part:rgb`,
        icon: `rgb`,
        title: `RGB LED`,
        body: `Three colours in one lens — click it to mix.`,
        x: 290,
        y: -350,
        w: 238,
        side: `bottom`,
        at: 40,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `pin:D10`,
        icon: `pwm`,
        wide: !0,
        title: `Pins ~9 ~10 ~11`,
        body: `One PWM pin for each colour.`,
        x: -162,
        y: -350,
        w: 252,
        side: `bottom`,
        at: 70,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `pin:GND`,
        icon: `ground`,
        title: `GND`,
        body: `The longest leg is the shared ground.`,
        x: -498,
        y: -330,
        w: 236,
        side: `right`,
        at: 46,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `part:r-green`,
        icon: `resistor`,
        wide: !0,
        title: `3 Resistors`,
        body: `220 Ω on each colour keeps the current safe.`,
        x: 270,
        y: 160,
        w: 248,
        side: `left`,
        at: 46,
        leg: 40,
        ring: !0,
      },
    ],
    sim: `rgb`,
  },
  {
    id: `light`,
    title: `Sense light`,
    cardTitle: `6. Sense light`,
    thumb: `lamp`,
    heading: `Sense light`,
    lede: `A light-dependent resistor (LDR) conducts better the more light falls on it. Paired with a fixed resistor it turns brightness into a voltage — just right for a night light that comes on when it gets dark.`,
    features: [
      [`wave`, `Read brightness with <code>analogRead()</code>`],
      [`lamp`, `Drag the lamp away, or switch it off`],
      [`logic`, `Switch the LED on below a threshold`],
    ],
    pinout: [
      [`5V`, `LDR (left leg)`, `Top of the voltage divider.`, `#d64a3a`],
      [
        `A0`,
        `LDR + 10 kΩ`,
        `The middle of the divider: higher when brighter.`,
        `#3fae6a`,
      ],
      [`GND`, `10 kΩ`, `Bottom of the divider.`, `#2f3547`],
      [`~D9`, `220 Ω → LED`, `The night light.`, `#f0a53a`],
      [`GND`, `LED (−)`, `The LED’s return path.`, `#2f3547`],
    ],
    example: [
      `The LDR and the 10 kΩ resistor form a voltage divider: more light, lower LDR resistance, higher voltage on A0.`,
      `<code>analogRead(SENSOR)</code> turns that voltage into a number from 0 (dark) to 1023 (very bright).`,
      `If the reading drops below the threshold the sketch decides it is dark and switches the LED on.`,
      `Move the lamp and watch the reading in the serial monitor — light falls off quickly with distance.`,
    ],
    specs: [
      [`LDR`, `GL5528 photoresistor`],
      [`In daylight`, `≈ 10–20 kΩ`],
      [`In the dark`, `≈ 1 MΩ`],
      [`Divider resistor`, `10 kΩ to GND`],
      [`Response time`, `≈ 20–30 ms`],
    ],
    params: [
      {
        key: `dist`,
        part: `lamp`,
        label: `Lamp distance`,
        type: `range`,
        min: 5,
        max: 50,
        step: 1,
        value: 18,
        unit: `cm`,
      },
      {
        key: `lamp`,
        part: `lamp`,
        label: `Lamp switched on`,
        type: `toggle`,
        value: !0,
      },
      {
        key: `threshold`,
        part: `ldr`,
        label: `Dark below`,
        type: `range`,
        min: 50,
        max: 1e3,
        step: 10,
        value: 400,
      },
    ],
    code: `const int SENSOR = A0;
const int LED = 9;

void setup() {
  Serial.begin(9600);
  pinMode(LED, OUTPUT);
}

void loop() {
  int light = analogRead(SENSOR);  // more light = higher
  Serial.println(light);

  if (light < {{threshold}}) {
    digitalWrite(LED, HIGH);  // dark: night light on
  } else {
    digitalWrite(LED, LOW);
  }
  delay(100);
}`,
    callouts: [
      {
        anchor: `part:led`,
        icon: `led`,
        title: `Night Light`,
        body: `Comes on when the reading says “dark”.`,
        x: -162,
        y: -350,
        w: 252,
        side: `bottom`,
        at: 200,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `part:ldr`,
        icon: `sun`,
        title: `Light Sensor`,
        body: `Less resistance the more light it gets.`,
        x: 290,
        y: -350,
        w: 238,
        side: `bottom`,
        at: 40,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `pin:A0`,
        icon: `wave`,
        wide: !0,
        title: `Pin A0`,
        body: `Reads the divider as 0–1023.`,
        x: -498,
        y: 130,
        w: 250,
        side: `top`,
        at: 150,
        leg: 40,
        ring: !0,
      },
      {
        anchor: `part:lamp`,
        icon: `lamp`,
        title: `Desk Lamp`,
        body: `Drag it away, or switch it off.`,
        x: 250,
        y: 160,
        w: 238,
        side: `top`,
        at: 72,
        leg: 40,
        ring: !0,
      },
    ],
    sim: `light`,
  },
  {
    id: `sensor`,
    title: `Read a sensor`,
    cardTitle: `7. Read a sensor`,
    thumb: `sensor`,
    heading: `Read a sensor`,
    lede: `The HC-SR04 sends out a burst of ultrasound and listens for the echo. Timing how long it takes tells you how far away the obstacle is — click it to swap it or drag it closer.`,
    features: [
      [`wave`, `Trigger a ping, time the echo with <code>pulseIn()</code>`],
      [`ruler`, `Every 58 µs of echo is about 1 cm`],
      [`car`, `Swap the obstacle: some echo better than others`],
    ],
    pinout: [
      [`5V`, `VCC`, `Powers the sensor.`, `#d64a3a`],
      [`GND`, `Gnd`, `Common ground.`, `#2f3547`],
      [`D9`, `Trig`, `A 10 µs HIGH pulse starts a ping.`, `#f0b53a`],
      [
        `D10`,
        `Echo`,
        `Stays HIGH for as long as the sound travels.`,
        `#3fae6a`,
      ],
    ],
    example: [
      `<code>Serial.begin(9600)</code> opens the serial monitor at 9600 baud.`,
      `A 10 µs pulse on <code>TRIG</code> fires eight 40 kHz pulses from the transmitter.`,
      `<code>pulseIn(ECHO, HIGH)</code> measures the echo time in microseconds.`,
      `Dividing by 58 converts it to centimetres (sound travels there and back).`,
    ],
    specs: [
      [`Range`, `2–400 cm`],
      [`Resolution`, `≈ 3 mm`],
      [`Frequency`, `40 kHz`],
      [`Beam angle`, `≈ 15°`],
      [`Supply`, `5 V, 15 mA`],
    ],
    params: [
      ...d,
      {
        key: `interval`,
        part: `sensor`,
        label: `Read every`,
        type: `range`,
        min: 50,
        max: 1e3,
        step: 50,
        value: 100,
        unit: `ms`,
      },
    ],
    code: `const int TRIG = 9;
const int ECHO = 10;

void setup() {
  Serial.begin(9600);
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
}

void loop() {
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);

  long cm = pulseIn(ECHO, HIGH) / 58;
  Serial.println(cm);
  delay({{interval}});
}`,
    callouts: [
      {
        anchor: `part:sensor`,
        icon: `sensor`,
        wide: !0,
        title: `HC-SR04`,
        body: `Pings at 40 kHz and times the echo.`,
        x: 290,
        y: -350,
        w: 238,
        side: `bottom`,
        at: 40,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `pin:D9`,
        icon: `pins`,
        title: `Trig · Echo`,
        body: `Pin 9 fires the ping, pin 10 hears the echo.`,
        x: -162,
        y: -350,
        w: 262,
        side: `bottom`,
        at: 70,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `pin:5V`,
        icon: `plug`,
        title: `5V · GND`,
        body: `Power for the sensor, straight from the board.`,
        x: -498,
        y: 130,
        w: 250,
        side: `top`,
        at: 150,
        leg: 40,
        ring: !0,
      },
      {
        anchor: `part:obstacle`,
        icon: `car`,
        wide: !0,
        title: `Obstacle`,
        body: `Click to swap it, drag to move it.`,
        x: 270,
        y: 160,
        w: 238,
        side: `left`,
        at: 46,
        leg: 40,
        ring: !0,
      },
    ],
    sim: `sensor`,
  },
  {
    id: `sound`,
    title: `Make a sound`,
    cardTitle: `8. Make a sound`,
    thumb: `buzzer`,
    heading: `Make a sound`,
    lede: `A piezo buzzer clicks every time its pin flips. Flip it hundreds of times a second and you hear a note — <code>tone()</code> does exactly that.`,
    features: [
      [`speaker`, `Play notes with <code>tone(pin, Hz, ms)</code>`],
      [`console`, `Store a tune in an array`],
      [`clock`, `Click the buzzer to pick a tune and tempo`],
    ],
    pinout: [
      [`D8`, `Buzzer (+)`, `Toggled at the note’s frequency.`, `#f0a53a`],
      [`GND`, `Buzzer (−)`, `Return path.`, `#2f3547`],
    ],
    example: [
      `The <code>melody</code> array holds each note’s frequency in hertz: 262 Hz is middle C.`,
      `<code>tone(BUZZER, hz, ms)</code> plays a square wave for <code>ms</code> milliseconds.`,
      `The <code>delay</code> after each note leaves a short gap so repeated notes sound separate.`,
      `After the last note the loop rests for a second, then starts again.`,
    ],
    specs: [
      [`Buzzer`, `Passive piezo, 12 mm`],
      [`Range`, `≈ 100 Hz – 10 kHz`],
      [`Middle C`, `262 Hz`],
      [`A above`, `440 Hz`],
      [`Tip`, `An active buzzer only beeps at one pitch`],
    ],
    params: [
      {
        key: `melody`,
        part: `buzzer`,
        label: `Tune`,
        type: `choice`,
        value: `twinkle`,
        options: [
          {
            value: `scale`,
            label: `Scale`,
            note: `C major, one octave.`,
            code: { notes: h(p.scale, 4) },
          },
          {
            value: `twinkle`,
            label: `Twinkle`,
            note: `Twinkle, twinkle, little star.`,
            code: { notes: h(p.twinkle, 7) },
          },
          {
            value: `ode`,
            label: `Ode to Joy`,
            note: `Beethoven’s Ninth, first phrase.`,
            code: { notes: h(p.ode, 5) },
          },
        ],
      },
      {
        key: `note`,
        part: `buzzer`,
        label: `Note length`,
        type: `range`,
        min: 80,
        max: 500,
        step: 10,
        value: 220,
        unit: `ms`,
      },
      {
        key: `volume`,
        part: `buzzer`,
        label: `Speaker volume`,
        type: `range`,
        min: 0,
        max: 100,
        step: 5,
        value: 40,
        unit: `%`,
      },
    ],
    code: `const int BUZZER = 8;
{{melody.notes}}
const int N = sizeof(melody) / sizeof(int);

void setup() {}

void loop() {
  for (int i = 0; i < N; i++) {
    tone(BUZZER, melody[i], {{note}});
    delay({{note}} + 50);
  }
  delay(1000);
}`,
    callouts: [
      {
        anchor: `part:buzzer`,
        icon: `speaker`,
        title: `Piezo Buzzer`,
        body: `Click it to pick a tune and tempo.`,
        x: 290,
        y: -350,
        w: 238,
        side: `bottom`,
        at: 40,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `pin:D8`,
        icon: `pin`,
        title: `Pin 8`,
        body: `<code>tone()</code> toggles it at the note’s pitch.`,
        x: -162,
        y: -350,
        w: 262,
        side: `bottom`,
        at: 40,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `pin:GND`,
        icon: `ground`,
        title: `GND`,
        body: `The buzzer’s other leg.`,
        x: -498,
        y: -330,
        w: 226,
        side: `right`,
        at: 46,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `mcu`,
        icon: `chip`,
        title: `Timer`,
        body: `A hardware timer keeps each note in tune.`,
        x: -498,
        y: 130,
        w: 250,
        side: `top`,
        at: 150,
        leg: 40,
        ring: !0,
      },
    ],
    sim: `sound`,
  },
  {
    id: `piano`,
    title: `Mini piano`,
    cardTitle: `9. Mini piano`,
    thumb: `piano`,
    heading: `Build a mini piano`,
    lede: `Eight keys and a buzzer make a piano you can play. Each key connects its pin to ground, so the Uno’s own pull-up resistors do the rest — no resistors on the breadboard — and <code>tone()</code> plays the note of whichever key is down.`,
    features: [
      [`piano`, `Eight keys, one note each, Do to Do`],
      [`pin`, `<code>INPUT_PULLUP</code>: no resistors needed`],
      [`note`, `Press the keys, or let it play a tune`],
    ],
    pinout: [
      [
        `D2–D9`,
        `Keys, Do to high Do`,
        `Pulled up inside the Uno: LOW while the key is down.`,
        `#3fae6a`,
      ],
      [
        `D10`,
        `Buzzer (+)`,
        `<code>tone()</code> plays the note here.`,
        `#7a5034`,
      ],
      [
        `GND`,
        `Back − rail`,
        `The other leg of every key, and the buzzer’s (−).`,
        `#2f3547`,
      ],
    ],
    example: [
      `<code>INPUT_PULLUP</code> switches on a resistor inside the chip from the pin to 5 V, so the pin reads HIGH until a key connects it straight to ground. That is why a pressed key reads LOW.`,
      `The pins and their notes sit in two arrays in the same order, so key <code>i</code> plays <code>NOTES[i]</code>.`,
      `The loop only calls <code>tone()</code> or <code>noTone()</code> when the key changes, so a held note stays steady and the serial monitor shows each note once.`,
      `A note is a frequency: middle C is 262 Hz, and each octave up doubles it.`,
    ],
    specs: [
      [`Keys`, `8 tactile switches, 6 mm`],
      [`Notes`, `C4–C5 (or C5–C6)`],
      [`Pull-ups`, `Built in, about 20–50 kΩ`],
      [`Buzzer`, `Passive piezo on D10`],
      [`Breadboard`, `Full size, with power rails`],
    ],
    params: [
      {
        key: `tune`,
        part: `buzzer`,
        label: `Play by itself`,
        type: `choice`,
        value: `off`,
        options: [
          {
            value: `off`,
            label: `No, I play`,
            note: `Press and hold the keys in the scene.`,
          },
          {
            value: `scale`,
            label: `Scale`,
            note: `Up the keys and back down.`,
          },
          {
            value: `twinkle`,
            label: `Twinkle`,
            note: `Twinkle, twinkle, little star.`,
          },
          {
            value: `ode`,
            label: `Ode to Joy`,
            note: `Beethoven, on eight keys.`,
          },
        ],
      },
      {
        key: `octave`,
        part: `buzzer`,
        label: `Octave`,
        type: `choice`,
        value: `low`,
        options: [
          {
            value: `low`,
            label: `C4–C5`,
            code: {
              notes: `const int NOTES[] = {262, 294, 330, 349, 392, 440, 494, 523};  // C4 to C5`,
            },
          },
          {
            value: `high`,
            label: `C5–C6`,
            note: `Every frequency doubled.`,
            code: {
              notes: `const int NOTES[] = {523, 587, 659, 698, 784, 880, 988, 1047};  // C5 to C6`,
            },
          },
        ],
      },
      {
        key: `names`,
        part: `buzzer`,
        label: `Note names`,
        type: `choice`,
        value: `solfege`,
        options: [
          {
            value: `solfege`,
            label: `Do Re Mi`,
            code: {
              names: `const char* NAMES[] = {"Do", "Re", "Mi", "Fa", "Sol", "La", "Si", "Do"};`,
            },
          },
          {
            value: `letters`,
            label: `C D E`,
            code: {
              names: `const char* NAMES[] = {"C", "D", "E", "F", "G", "A", "B", "C"};`,
            },
          },
        ],
      },
    ],
    code: `const int BUZZER = 10;
const int KEYS[] = {2, 3, 4, 5, 6, 7, 8, 9};
{{octave.notes}}
{{names.names}}
int playing = -1;  // the key sounding now, or -1

void setup() {
  Serial.begin(9600);
  for (int i = 0; i < 8; i++) {
    pinMode(KEYS[i], INPUT_PULLUP);  // HIGH until pressed
  }
}

void loop() {
  int pressed = -1;
  for (int i = 0; i < 8; i++) {
    if (digitalRead(KEYS[i]) == LOW) pressed = i;  // LOW: key down
  }
  if (pressed != playing) {
    playing = pressed;
    if (playing >= 0) {
      tone(BUZZER, NOTES[playing]);
      Serial.println(NAMES[playing]);
    } else {
      noTone(BUZZER);
    }
  }
}`,
    callouts: [
      {
        anchor: `part:breadboard`,
        icon: `ground`,
        title: `The − rail`,
        body: `One long ground strip for every key.`,
        x: -162,
        y: -350,
        w: 250,
        side: `bottom`,
        at: 200,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `part:buzzer`,
        icon: `speaker`,
        wide: !0,
        title: `Passive buzzer`,
        body: `<code>tone()</code> sets the note it plays.`,
        x: 290,
        y: -350,
        w: 238,
        side: `bottom`,
        at: 40,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `part:key6`,
        icon: `piano`,
        wide: !0,
        title: `Keys`,
        body: `Hold one down to play its note.`,
        x: 270,
        y: 160,
        w: 238,
        side: `left`,
        at: 46,
        leg: 40,
        ring: !0,
      },
      {
        anchor: `pin:D2`,
        icon: `pin`,
        title: `Pins 2–9`,
        body: `<code>INPUT_PULLUP</code>: HIGH until pressed.`,
        x: -498,
        y: 130,
        w: 250,
        side: `top`,
        at: 150,
        leg: 40,
        ring: !0,
      },
    ],
    sim: `piano`,
  },
  {
    id: `motor`,
    title: `Control a motor`,
    cardTitle: `10. Control a motor`,
    thumb: `motor`,
    heading: `Control a motor`,
    lede: `A pin can’t power a motor on its own, so a transistor does the heavy lifting. PWM switches it on and off very fast to set the speed.`,
    features: [
      [`pwm`, `Speed from 0 to 255 with <code>analogWrite()</code>`],
      [`transistor`, `TIP120 switches the motor current`],
      [`motor`, `Click the motor to change the ramp`],
    ],
    pinout: [
      [`~D6`, `1 kΩ → Base`, `PWM signal from the sketch.`, `#ef8a3a`],
      [`5V`, `Motor (+)`, `Motor supply.`, `#d64a3a`],
      [
        `—`,
        `Motor (−) → Collector`,
        `The transistor completes the motor circuit.`,
        `#2f3547`,
      ],
      [`GND`, `Emitter`, `Shared ground.`, `#2f3547`],
    ],
    example: [
      `<code>analogWrite(MOTOR, s)</code> sets the PWM duty cycle: 0 is off, 255 is fully on.`,
      `The <code>for</code> loop raises <code>s</code> step by step every 40 ms — a smooth ramp.`,
      `After holding top speed, writing 0 lets the motor coast to a stop.`,
      `Pins ~3, 5, 6, 9, 10 and 11 support PWM; the ~ on the board marks them.`,
    ],
    specs: [
      [`Motor`, `3–6 V DC, ~200 mA`],
      [`Transistor`, `TIP120 Darlington, 5 A`],
      [`Base resistor`, `1 kΩ (brown-black-red)`],
      [`PWM on pin 6`, `≈ 980 Hz`],
      [`Tip`, `Add a flyback diode across the motor`],
    ],
    params: [
      {
        key: `top`,
        part: `motor`,
        label: `Top speed`,
        type: `range`,
        min: 50,
        max: 255,
        step: 5,
        value: 255,
      },
      {
        key: `step`,
        part: `motor`,
        label: `Ramp step`,
        type: `range`,
        min: 1,
        max: 25,
        step: 1,
        value: 5,
      },
    ],
    code: `const int MOTOR = 6;  // PWM pin

void setup() {
  pinMode(MOTOR, OUTPUT);
}

void loop() {
  for (int s = 0; s <= {{top}}; s += {{step}}) {
    analogWrite(MOTOR, s);
    delay(40);
  }
  delay(1500);
  analogWrite(MOTOR, 0);
  delay(1500);
}`,
    callouts: [
      {
        anchor: `part:transistor`,
        icon: `transistor`,
        title: `Transistor`,
        body: `A small base current switches the motor.`,
        x: 290,
        y: -350,
        w: 238,
        side: `bottom`,
        at: 40,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `part:r1k`,
        icon: `resistor`,
        wide: !0,
        title: `1 kΩ Resistor`,
        body: `Keeps the base current safe for the pin.`,
        x: 26,
        y: -350,
        w: 248,
        side: `bottom`,
        at: 190,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `pin:D6`,
        icon: `pwm`,
        wide: !0,
        title: `Pin ~6 (PWM)`,
        body: `<code>analogWrite()</code> sets the speed, 0–255.`,
        x: -300,
        y: -350,
        w: 260,
        side: `bottom`,
        at: 230,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `part:motor`,
        icon: `motor`,
        wide: !0,
        title: `DC Motor`,
        body: `Click it to change the ramp.`,
        x: 270,
        y: 160,
        w: 238,
        side: `left`,
        at: 46,
        leg: 40,
        ring: !0,
      },
    ],
    sim: `motor`,
  },
  {
    id: `heat`,
    title: `Sense heat`,
    cardTitle: `11. Sense heat`,
    thumb: `dryer`,
    heading: `Sense heat`,
    lede: `The TMP36 turns temperature into a voltage: 0.5 V at 0 °C and 10 mV more for every degree. Point a hairdryer at it and switch a fan on when it gets too warm — a tiny thermostat.`,
    features: [
      [`thermo`, `<code>analogRead()</code> to degrees in one line`],
      [`dryer`, `Drag the hairdryer closer, or switch it off`],
      [`fan`, `The fan cools the sensor and holds the limit`],
    ],
    pinout: [
      [`5V`, `TMP36 Vs (left)`, `Power for the sensor.`, `#d64a3a`],
      [`A0`, `TMP36 Vout (middle)`, `0.5 V plus 10 mV per °C.`, `#3fae6a`],
      [`GND`, `TMP36 GND (right)`, `Ground.`, `#2f3547`],
      [
        `~D6`,
        `1 kΩ → Base`,
        `Switches the fan through the transistor.`,
        `#ef8a3a`,
      ],
    ],
    example: [
      `<code>analogRead(SENSOR)</code> gives 0–1023 for 0–5 V, so <code>raw * 5.0 / 1023.0</code> turns it back into volts.`,
      `The TMP36 reads 0.5 V at 0 °C, which makes <code>(volts - 0.5) * 100</code> the temperature in °C.`,
      `Above the limit the fan switches on through the transistor, just like the motor lesson.`,
      `The fan blows on the sensor and cools it, so the temperature settles around the limit: that is a thermostat.`,
    ],
    specs: [
      [`Sensor`, `TMP36, −40 to 125 °C`],
      [`Output`, `10 mV/°C, 750 mV at 25 °C`],
      [`Accuracy`, `±2 °C`],
      [`Fan`, `5 V DC, switched by a TIP120`],
      [`Reading`, `every 200 ms`],
    ],
    params: [
      {
        key: `dist`,
        part: `dryer`,
        label: `Hairdryer distance`,
        type: `range`,
        min: 5,
        max: 40,
        step: 1,
        value: 14,
        unit: `cm`,
      },
      {
        key: `dryer`,
        part: `dryer`,
        label: `Hairdryer switched on`,
        type: `toggle`,
        value: !0,
      },
      {
        key: `threshold`,
        part: `tmp36`,
        label: `Fan on above`,
        type: `range`,
        min: 24,
        max: 45,
        step: 1,
        value: 30,
        unit: `°C`,
      },
      {
        key: `fan`,
        part: `fan`,
        label: `Fan speed`,
        type: `choice`,
        value: `switch`,
        options: [
          {
            value: `switch`,
            label: `On / off`,
            note: `Full speed above the limit, off below it.`,
            code: {
              logic: `  if (tempC > {{threshold}}) {
    analogWrite(FAN, 255);  // too warm: fan on
  } else {
    analogWrite(FAN, 0);
  }`,
            },
          },
          {
            value: `ramp`,
            label: `Ramp`,
            note: `Faster the hotter it gets: full speed 8 °C over the limit.`,
            code: {
              logic: `  int speed = (tempC - {{threshold}}) * 32;
  analogWrite(FAN, constrain(speed, 0, 255));`,
            },
          },
        ],
      },
    ],
    code: `const int SENSOR = A0;
const int FAN = 6;  // PWM, through the transistor

void setup() {
  Serial.begin(9600);
  pinMode(FAN, OUTPUT);
}

void loop() {
  int raw = analogRead(SENSOR);
  float volts = raw * 5.0 / 1023.0;
  float tempC = (volts - 0.5) * 100.0;
  Serial.println(tempC);

{{fan.logic}}
  delay(200);
}`,
    callouts: [
      {
        anchor: `part:tmp36`,
        icon: `thermo`,
        title: `TMP36`,
        body: `Its voltage climbs 10 mV for every degree.`,
        x: 290,
        y: -350,
        w: 238,
        side: `bottom`,
        at: 40,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `part:fan`,
        icon: `fan`,
        title: `Fan`,
        body: `On above the limit; it cools the sensor.`,
        x: -162,
        y: -350,
        w: 250,
        side: `bottom`,
        at: 200,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `part:dryer`,
        icon: `dryer`,
        wide: !0,
        title: `Hairdryer`,
        body: `Drag it closer to heat the sensor.`,
        x: 270,
        y: 160,
        w: 238,
        side: `left`,
        at: 46,
        leg: 40,
        ring: !0,
      },
      {
        anchor: `pin:A0`,
        icon: `wave`,
        title: `Pin A0`,
        body: `<code>analogRead()</code> sees the sensor’s volts.`,
        x: -498,
        y: 130,
        w: 250,
        side: `top`,
        at: 150,
        leg: 40,
        ring: !0,
      },
    ],
    sim: `heat`,
  },
  {
    id: `servo`,
    title: `Sweep a servo`,
    cardTitle: `12. Sweep a servo`,
    thumb: `servo`,
    heading: `Sweep a servo`,
    lede: `A servo is a motor that knows where it is. Tell it an angle from 0° to 180° and it turns there and holds — perfect for arms, flaps and pointers.`,
    features: [
      [`servo`, `Position with <code>arm.write(angle)</code>`],
      [`console`, `The Servo library makes the pulses for you`],
      [`clock`, `Click the servo to change the sweep`],
    ],
    pinout: [
      [`GND`, `Brown wire`, `Ground.`, `#7a5034`],
      [`5V`, `Red wire`, `Power for the motor.`, `#d64a3a`],
      [
        `D9`,
        `Orange wire`,
        `Signal: a 0.5–2.4 ms pulse every 20 ms.`,
        `#f0a53a`,
      ],
    ],
    example: [
      `<code>#include &lt;Servo.h&gt;</code> brings in the library; <code>Servo arm;</code> makes one servo.`,
      `<code>arm.attach(9)</code> starts sending position pulses on pin 9.`,
      `The first <code>for</code> loop steps the angle up one degree at a time, the second steps it back.`,
      `The <code>delay</code> sets how fast it sweeps: smaller is faster.`,
    ],
    specs: [
      [`Servo`, `SG90 micro, 9 g`],
      [`Travel`, `0–180°`],
      [`Speed`, `≈ 0.1 s per 60°`],
      [`Torque`, `1.8 kg·cm at 4.8 V`],
      [`Signal`, `50 Hz, 0.5–2.4 ms pulses`],
    ],
    params: [
      {
        key: `from`,
        part: `servo`,
        label: `From`,
        type: `range`,
        min: 0,
        max: 175,
        step: 5,
        value: 0,
        unit: `°`,
      },
      {
        key: `to`,
        part: `servo`,
        label: `To`,
        type: `range`,
        min: 5,
        max: 180,
        step: 5,
        value: 180,
        unit: `°`,
      },
      {
        key: `wait`,
        part: `servo`,
        label: `Step delay`,
        type: `range`,
        min: 2,
        max: 40,
        step: 1,
        value: 12,
        unit: `ms`,
      },
    ],
    constrain(e, t) {
      e.from >= e.to &&
        (t === `from`
          ? (e.to = Math.min(180, e.from + 5))
          : (e.from = Math.max(0, e.to - 5)));
    },
    code: `#include <Servo.h>
Servo arm;

void setup() {
  arm.attach(9);
}

void loop() {
  for (int a = {{from}}; a <= {{to}}; a++) {
    arm.write(a);
    delay({{wait}});
  }
  for (int a = {{to}}; a >= {{from}}; a--) {
    arm.write(a);
    delay({{wait}});
  }
}`,
    callouts: [
      {
        anchor: `part:servo`,
        icon: `servo`,
        title: `SG90 Servo`,
        body: `Click it to change how far it sweeps.`,
        x: 290,
        y: -350,
        w: 238,
        side: `bottom`,
        at: 40,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `pin:D9`,
        icon: `pwm`,
        wide: !0,
        title: `Pin 9 (signal)`,
        body: `Pulse width sets the angle.`,
        x: -162,
        y: -350,
        w: 250,
        side: `bottom`,
        at: 40,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `pin:5V`,
        icon: `plug`,
        title: `5V · GND`,
        body: `The servo’s red and brown wires.`,
        x: -498,
        y: 130,
        w: 250,
        side: `top`,
        at: 150,
        leg: 40,
        ring: !0,
      },
    ],
    sim: `servo`,
  },
  {
    id: `stepper`,
    title: `Spin the wheel`,
    cardTitle: `13. Spin the wheel`,
    thumb: `wheel`,
    heading: `Spin the wheel`,
    lede: `A stepper motor turns in exact steps — 2048 make one full turn of this one. Count the steps and you know exactly where it stops: press the button and the prize wheel lands dead centre on a segment, every time.`,
    features: [
      [`stepper`, `<code>wheel.move(n)</code> turns exactly n steps`],
      [`coils`, `Four coils switched in turn: watch LEDs A–D`],
      [`button`, `Press the button to spin`],
    ],
    pinout: [
      [
        `D8–D11`,
        `IN1–IN4`,
        `One pin per coil, through the ULN2003.`,
        `#f0a53a`,
      ],
      [
        `5V · GND`,
        `Driver + and −`,
        `The coils need more current than a pin can give.`,
        `#d64a3a`,
      ],
      [`D2`, `Button`, `HIGH while pressed (10 kΩ pull-down).`, `#3d6fc4`],
    ],
    example: [
      `The AccelStepper library drives the four coils; the 28BYJ-48 wants its pins as IN1, IN3, IN2, IN4.`,
      `2048 steps ÷ 8 segments is exactly 256 steps a segment, so the wheel never drifts off centre.`,
      `The sketch picks a <code>random()</code> prize, counts the steps to it and adds whole turns for the drama.`,
      `From a standstill this little motor manages about 15 RPM. <code>setAcceleration()</code> ramps the speed up and back down, so it can spin faster without skipping a step.`,
    ],
    specs: [
      [`Motor`, `28BYJ-48, 5 V`],
      [`Steps per turn`, `2048 (64 : 1 gearbox)`],
      [`Driver`, `ULN2003 Darlington array`],
      [`Speed`, `≈ 15 RPM from a standstill, more with a ramp`],
      [`Segments`, `8 × 256 steps`],
    ],
    params: [
      {
        key: `speed`,
        part: `stepper`,
        label: `Top speed`,
        type: `range`,
        min: 6,
        max: 28,
        step: 1,
        value: 24,
        unit: `RPM`,
      },
      {
        key: `accel`,
        part: `stepper`,
        label: `Acceleration`,
        type: `range`,
        min: 200,
        max: 3e3,
        step: 100,
        value: 1200,
        unit: `steps/s²`,
      },
      {
        key: `turns`,
        part: `stepper`,
        label: `Whole turns first`,
        type: `range`,
        min: 0,
        max: 3,
        step: 1,
        value: 1,
      },
      {
        key: `dir`,
        part: `stepper`,
        label: `Direction`,
        type: `choice`,
        value: `cw`,
        options: [
          {
            value: `cw`,
            label: `Clockwise`,
            code: { ahead: `(prize - at + SEGMENTS) % SEGMENTS`, sign: `` },
          },
          {
            value: `ccw`,
            label: `Anticlockwise`,
            code: { ahead: `(at - prize + SEGMENTS) % SEGMENTS`, sign: `-` },
          },
        ],
      },
    ],
    code: `#include <AccelStepper.h>

const int STEPS = 2048;    // one turn of a 28BYJ-48
const int SEGMENTS = 8;    // 256 steps each
const int BUTTON = 2;
// four wires, full steps: pins IN1, IN3, IN2, IN4
AccelStepper wheel(AccelStepper::FULL4WIRE, 8, 10, 9, 11);

const char* PRIZES[] = {"50", "100", "200", "AGAIN",
                        "500", "x2", "1000", "JACKPOT"};
int at = 0;  // the segment under the pointer

void setup() {
  pinMode(BUTTON, INPUT);
  wheel.setMaxSpeed({{speed}} * STEPS / 60.0);  // steps a second
  wheel.setAcceleration({{accel}});
  Serial.begin(9600);
  randomSeed(analogRead(A0));
}

void loop() {
  if (digitalRead(BUTTON) == HIGH) {
    int prize = random(SEGMENTS);
    int ahead = {{dir.ahead}};
    long steps = ({{turns}} * SEGMENTS + ahead) * (STEPS / SEGMENTS);
    wheel.move({{dir.sign}}steps);
    wheel.runToPosition();  // speed up, spin, slow down onto it
    at = prize;
    Serial.print("Landed on ");
    Serial.println(PRIZES[at]);
  }
}`,
    callouts: [
      {
        anchor: `part:stepper`,
        icon: `stepper`,
        wide: !0,
        title: `Stepper motor`,
        body: `Exact steps: 2048 make a turn.`,
        x: 290,
        y: -350,
        w: 238,
        side: `bottom`,
        at: 40,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `part:driver`,
        icon: `coils`,
        wide: !0,
        title: `ULN2003 driver`,
        body: `LEDs A–D light with the coils.`,
        x: 270,
        y: 160,
        w: 238,
        side: `left`,
        at: 46,
        leg: 40,
        ring: !0,
      },
      {
        anchor: `part:button`,
        icon: `button`,
        title: `Push button`,
        body: `Press it to spin the wheel.`,
        x: -162,
        y: -350,
        w: 250,
        side: `bottom`,
        at: 200,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `pin:D9`,
        icon: `pins`,
        title: `Pins 8–11`,
        body: `One pin for each coil.`,
        x: -498,
        y: 130,
        w: 236,
        side: `top`,
        at: 150,
        leg: 40,
        ring: !0,
      },
    ],
    sim: `stepper`,
  },
  {
    id: `plant`,
    title: `Smart plant`,
    cardTitle: `14. Smart plant`,
    thumb: `plant`,
    heading: `Smart plant monitor`,
    lede: `A capacitive sensor in the soil says how wet it is, and a little OLED screen turns that into a percentage and a mood. Let the soil dry out until the plant asks for water, then hold the watering can over it.`,
    features: [
      [`drop`, `<code>map()</code> turns the reading into 0–100 %`],
      [`screen`, `Text and a bar on a 128 × 64 OLED screen`],
      [`can`, `Hold the watering can down to water the plant`],
    ],
    pinout: [
      [
        `5V · GND`,
        `Sensor VCC and GND`,
        `Power for the soil sensor.`,
        `#d64a3a`,
      ],
      [`A0`, `Sensor AOUT`, `Lower the wetter the soil is.`, `#f0b53a`],
      [`3V3 · GND`, `OLED VCC and GND`, `The screen runs on 3.3 V.`, `#ee7f62`],
      [
        `SCL · SDA`,
        `OLED SCL and SDA`,
        `I²C: a clock and a data line (the same pins as A5 and A4).`,
        `#3d6fc4`,
      ],
    ],
    example: [
      `A capacitive sensor has no bare metal in the soil, so it doesn’t corrode. Wetter soil reads <em>lower</em>: about 520 in dry air, about 260 in a glass of water.`,
      `<code>map(raw, DRY, WET, 0, 100)</code> stretches those two readings to 0 and 100 %, and <code>constrain()</code> keeps the result in range. Measure your own sensor in air and in water and put its numbers in.`,
      `The screen listens on the I²C bus at address 0x3C. The Adafruit SSD1306 library draws text and shapes in memory; <code>display()</code> sends the whole picture.`,
      `<code>if</code>, <code>else if</code> and <code>else</code> pick one of three messages.`,
    ],
    specs: [
      [`Sensor`, `Capacitive soil moisture v1.2, 3.3–5.5 V`],
      [`Output`, `About 2.5 V in dry air, 1.3 V in water`],
      [`Screen`, `0.96″ OLED, 128 × 64, SSD1306`],
      [`Bus`, `I²C, address 0x3C`],
      [`Reading`, `Every 500 ms`],
    ],
    params: [
      {
        key: `thirsty`,
        part: `oled`,
        label: `“Water me!” below`,
        type: `range`,
        min: 10,
        max: 50,
        step: 5,
        value: 30,
        unit: `%`,
      },
      {
        key: `soggy`,
        part: `oled`,
        label: `“Too wet!” above`,
        type: `range`,
        min: 60,
        max: 95,
        step: 5,
        value: 85,
        unit: `%`,
      },
      {
        key: `dry`,
        part: `soil`,
        label: `Reading in dry air`,
        type: `range`,
        min: 400,
        max: 700,
        step: 10,
        value: 520,
      },
      {
        key: `wet`,
        part: `soil`,
        label: `Reading in water`,
        type: `range`,
        min: 150,
        max: 400,
        step: 10,
        value: 260,
      },
      {
        key: `sun`,
        part: `plant`,
        label: `Where it stands`,
        type: `choice`,
        value: `window`,
        options: [
          {
            value: `shade`,
            label: `Shade`,
            note: `The soil dries out slowly.`,
          },
          {
            value: `window`,
            label: `Window`,
            note: `Thirsty again in a few seconds.`,
          },
          { value: `sun`, label: `Full sun`, note: `The soil dries out fast.` },
        ],
      },
    ],
    constrain(e, t) {
      e.dry - e.wet < 20 &&
        (t === `wet`
          ? (e.dry = Math.min(700, e.wet + 20))
          : (e.wet = Math.max(150, e.dry - 20)));
    },
    code: `#include <Wire.h>
#include <Adafruit_SSD1306.h>

const int SENSOR = A0;
const int DRY = {{dry}};  // the reading in dry air
const int WET = {{wet}};  // the reading in water
Adafruit_SSD1306 screen(128, 64, &Wire);

void setup() {
  Serial.begin(9600);
  screen.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  screen.setTextColor(SSD1306_WHITE);
}

void loop() {
  int raw = analogRead(SENSOR);
  int moisture = map(raw, DRY, WET, 0, 100);
  moisture = constrain(moisture, 0, 100);
  Serial.println(moisture);

  screen.clearDisplay();
  screen.setTextSize(3);
  screen.setCursor(0, 0);
  screen.print(moisture);
  screen.print("%");
  screen.drawRect(0, 28, 128, 8, SSD1306_WHITE);
  screen.fillRect(0, 28, moisture * 128 / 100, 8, SSD1306_WHITE);

  screen.setTextSize(2);
  screen.setCursor(0, 46);
  if (moisture < {{thirsty}}) {
    screen.print("Water me!");
  } else if (moisture > {{soggy}}) {
    screen.print("Too wet!");
  } else {
    screen.print("Happy :)");
  }
  screen.display();
  delay(500);
}`,
    callouts: [
      {
        anchor: `part:oled`,
        icon: `screen`,
        title: `OLED screen`,
        body: `The sketch draws the reading on it.`,
        x: -162,
        y: -350,
        w: 250,
        side: `bottom`,
        at: 200,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `part:soil`,
        icon: `drop`,
        wide: !0,
        title: `Soil sensor`,
        body: `Reads lower the wetter the soil is.`,
        x: 290,
        y: -350,
        w: 238,
        side: `bottom`,
        at: 40,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `part:can`,
        icon: `can`,
        wide: !0,
        title: `Watering can`,
        body: `Hold it down to water the plant.`,
        x: 300,
        y: 206,
        w: 238,
        side: `top`,
        at: 60,
        leg: 26,
        ring: !0,
      },
      {
        anchor: `pin:A0`,
        icon: `wave`,
        title: `Pin A0`,
        body: `<code>analogRead()</code> gives 0–1023.`,
        x: -498,
        y: 130,
        w: 250,
        side: `top`,
        at: 150,
        leg: 40,
        ring: !0,
      },
    ],
    sim: `plant`,
  },
  {
    id: `force`,
    title: `Feel the force`,
    cardTitle: `15. Feel the force`,
    thumb: `meter`,
    heading: `Test your strength`,
    lede: `A force-sensing resistor (FSR) is a thin pad whose resistance falls from millions of ohms to a few hundred as you press it. In a voltage divider, <code>analogRead()</code> measures how hard you push: a servo swings the needle, and a hard enough press rings the bell.`,
    features: [
      [`press`, `Press the pad, then drag down to push harder`],
      [`gauge`, `<code>map()</code> turns the reading into the needle’s angle`],
      [`bell`, `Reach the mark and the bell rings`],
      [`weight`, `Or put a weight on it: heavier ones add less and less`],
    ],
    pinout: [
      [
        `5V`,
        `Force sensor`,
        `One side of the pad (and the servo’s power).`,
        `#d64a3a`,
      ],
      [
        `A0`,
        `Force sensor + pull-down`,
        `The divider: higher the harder you press.`,
        `#3fae6a`,
      ],
      [`GND`, `Pull-down`, `Holds A0 at 0 V while nobody presses.`, `#2f3547`],
      [`D9`, `Servo signal`, `Sets the needle’s angle.`, `#f0a53a`],
      [`D8`, `Buzzer`, `Rings the bell.`, `#8a63c9`],
    ],
    example: [
      `Untouched, the sensor is almost an open circuit and the pull-down holds A0 at 0. Press it and its resistance falls, so the divider’s voltage, and the reading, rise.`,
      `The reading is no scale: it climbs fast for a light touch and slowly for a hard one. <code>PULLDOWN * (1023 - force) / force</code> works back to the sensor’s own resistance.`,
      `The weights show it: with the 10 kΩ pull-down, 50 g reads about 460, 100 g about 640, 200 g about 760 and 500 g only about 870. Ten times the weight, not even twice the reading.`,
      `<code>best</code> keeps the hardest press and <code>bestAt</code> when it happened, so the needle holds your record for a moment before it lets go, like a fairground strength tester.`,
      `<code>map(best, 0, 1023, 0, 180)</code> turns the reading into an angle for the servo, and <code>tone()</code> rings the bell once when <code>best</code> passes the mark.`,
    ],
    specs: [
      [`Sensor`, `FSR 402, 18 mm round pad`],
      [`Force range`, `About 0.2–20 N (20 g to 2 kg)`],
      [`Resistance`, `Over 1 MΩ untouched, a few hundred Ω pressed hard`],
      [`Accuracy`, `Good for “how hard”, not for weighing things`],
      [`Needle`, `SG90 servo, 0–180°`],
    ],
    params: [
      {
        key: `ohms`,
        part: `pulldown`,
        label: `Pull-down`,
        type: `choice`,
        value: 1e4,
        options: [
          {
            value: 1e3,
            label: `1 kΩ`,
            note: `Only a hard press moves the needle far.`,
          },
          {
            value: 1e4,
            label: `10 kΩ`,
            note: `A good spread, from a light touch to a firm press.`,
          },
          {
            value: 1e5,
            label: `100 kΩ`,
            note: `A light touch already reads high; hard presses all look the same.`,
          },
        ],
      },
      {
        key: `weight`,
        part: `weights`,
        label: `On the pad`,
        type: `choice`,
        value: 0,
        options: [
          { value: 0, label: `None` },
          { value: 50, label: `50 g` },
          { value: 100, label: `100 g` },
          { value: 200, label: `200 g` },
          { value: 500, label: `500 g` },
        ],
      },
      {
        key: `bell`,
        part: `meter`,
        label: `Bell rings above`,
        type: `range`,
        min: 500,
        max: 1e3,
        step: 10,
        value: 880,
      },
      {
        key: `hold`,
        part: `meter`,
        label: `Hold the best for`,
        type: `range`,
        min: 0,
        max: 3e3,
        step: 250,
        value: 1500,
        unit: `ms`,
      },
    ],
    code: `#include <Servo.h>

const int FSR = A0;
const int BELL = 8;
const long PULLDOWN = {{ohms}};  // ohms, from A0 to GND
Servo needle;

int best = 0;              // the hardest press lately
unsigned long bestAt = 0;  // when it happened
bool rung = false;

void setup() {
  needle.attach(9);
  Serial.begin(9600);
}

void loop() {
  int force = analogRead(FSR);  // higher the harder you press

  // a harder press takes over; after a while the needle lets go
  if (force >= best || millis() - bestAt > {{hold}}) {
    best = force;
    bestAt = millis();
  }
  needle.write(map(best, 0, 1023, 0, 180));

  if (best > {{bell}} && !rung) {
    tone(BELL, 1568, 400);  // ding!
    rung = true;
  } else if (best < {{bell}} - 100) {
    rung = false;
  }

  if (force > 10) {
    // the sensor's resistance, worked out from the divider
    long ohms = PULLDOWN * (1023L - force) / force;
    Serial.print(force);
    Serial.print("  ");
    Serial.print(ohms);
    Serial.println(" ohms");
  }
  delay(20);
}`,
    callouts: [
      {
        anchor: `part:meter`,
        icon: `gauge`,
        wide: !0,
        title: `Strength meter`,
        body: `The needle swings to your best press.`,
        x: -530,
        y: -330,
        w: 220,
        side: `right`,
        at: 40,
        leg: 24,
        ring: !0,
      },
      {
        anchor: `part:buzzer`,
        icon: `bell`,
        title: `The bell`,
        body: `Rings when the needle passes the mark.`,
        x: 290,
        y: -350,
        w: 238,
        side: `bottom`,
        at: 40,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `part:fsr`,
        icon: `press`,
        wide: !0,
        title: `Force sensor`,
        body: `Press it, then drag down to push harder.`,
        x: -236,
        y: 176,
        w: 236,
        side: `right`,
        at: 30,
        leg: 22,
        ring: !0,
      },
      {
        anchor: `part:weights`,
        icon: `weight`,
        title: `Weights`,
        body: `Click one to put it on the pad, and again to take it off.`,
        x: 300,
        y: -215,
        w: 238,
        side: `bottom`,
        at: 60,
        leg: 26,
        ring: !0,
      },
      {
        anchor: `pin:A0`,
        icon: `wave`,
        title: `Pin A0`,
        body: `Reads the divider: higher the harder you press.`,
        x: -498,
        y: 130,
        w: 250,
        side: `top`,
        at: 150,
        leg: 40,
        ring: !0,
      },
    ],
    sim: `force`,
  },
  {
    id: `project`,
    title: `Build a project`,
    cardTitle: `16. Build a project`,
    thumb: `gears`,
    heading: `Parking sensor`,
    lede: `Put it all together: the distance sensor watches the obstacle and a traffic light tells the driver when to stop. Click the lights to move the thresholds.`,
    features: [
      [`logic`, `Decisions with comparisons`],
      [`lights`, `Three outputs, one for each colour`],
      [`sensor`, `Reuses the distance code from lesson 7`],
    ],
    pinout: [
      [
        `5V · GND`,
        `Sensor power`,
        `GND is bridged to the light module.`,
        `#d64a3a`,
      ],
      [`D9 · D10`, `Trig · Echo`, `Same as lesson 7.`, `#3d6fc4`],
      [`D4`, `Red`, `On when the obstacle is close.`, `#ee7f62`],
      [`D3`, `Yellow`, `On in between.`, `#f0b53a`],
      [`D2`, `Green`, `On when it is far away.`, `#3fae6a`],
    ],
    example: [
      `The loop measures distance exactly as in lesson 7.`,
      `A comparison like <code>cm &gt; 30</code> is either true (1) or false (0).`,
      `Writing it straight to a pin turns that LED on or off — no <code>if</code> needed.`,
      `Only one condition can be true at a time, so exactly one light is lit.`,
    ],
    specs: [
      [`Parts`, `Uno, HC-SR04, traffic light module`],
      [`Wires`, `8 jumpers`],
      [`Thresholds`, `Adjustable`],
      [`Update rate`, `≈ 15 times a second`],
      [`Next step`, `Add a buzzer from lesson 8`],
    ],
    params: [
      ...d,
      {
        key: `far`,
        part: `lights`,
        label: `Green beyond`,
        type: `range`,
        min: 10,
        max: 50,
        step: 1,
        value: 30,
        unit: `cm`,
      },
      {
        key: `near`,
        part: `lights`,
        label: `Red within`,
        type: `range`,
        min: 3,
        max: 45,
        step: 1,
        value: 15,
        unit: `cm`,
      },
    ],
    constrain(e, t) {
      e.near >= e.far &&
        (t === `near`
          ? (e.far = Math.min(50, e.near + 1))
          : (e.near = Math.max(3, e.far - 1)));
    },
    code: `const int TRIG = 9, ECHO = 10;
const int RED = 4, YLW = 3, GRN = 2;

void setup() {
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  for (int p = 2; p <= 4; p++)
    pinMode(p, OUTPUT);
}

void loop() {
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long cm = pulseIn(ECHO, HIGH) / 58;

  digitalWrite(GRN, cm > {{far}});
  digitalWrite(YLW, cm > {{near}} && cm <= {{far}});
  digitalWrite(RED, cm <= {{near}});
  delay(60);
}`,
    callouts: [
      {
        anchor: `part:sensor`,
        icon: `sensor`,
        wide: !0,
        title: `Distance Sensor`,
        body: `Keeps an eye on the obstacle.`,
        x: 0,
        y: -350,
        w: 250,
        side: `bottom`,
        at: 200,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `part:lights`,
        icon: `lights`,
        title: `Traffic Light`,
        body: `Click it to change the thresholds.`,
        x: 290,
        y: -350,
        w: 238,
        side: `bottom`,
        at: 40,
        leg: 30,
        ring: !0,
      },
      {
        anchor: `mcu`,
        icon: `logic`,
        title: `Your Logic`,
        body: `Comparisons choose which light is on.`,
        x: -498,
        y: 130,
        w: 250,
        side: `top`,
        at: 150,
        leg: 40,
        ring: !0,
      },
      {
        anchor: `part:obstacle`,
        icon: `car`,
        wide: !0,
        title: `Obstacle`,
        body: `Drag it closer and watch the lights.`,
        x: 270,
        y: 160,
        w: 238,
        side: `left`,
        at: 46,
        leg: 40,
        ring: !0,
      },
    ],
    sim: `project`,
  },
];
function _(e) {
  return Object.fromEntries((e.params ?? []).map((e) => [e.key, e.value]));
}
function te(e, t) {
  return v(e, t).replace(/\{\{(\w+)\}\}/g, (e, n) => String(t[n] ?? ``));
}
function v(e, t) {
  return e.code.replace(
    /\{\{(\w+)\.(\w+)\}\}/g,
    (n, r, i) =>
      e.params?.find((e) => e.key === r)?.options?.find((e) => e.value === t[r])
        ?.code?.[i] ?? ``,
  );
}
export { l, u, d, f, p, m, h, ee, _, te, v };
