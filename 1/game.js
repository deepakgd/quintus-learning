window.addEventListener('load',function() {
    var Q = Quintus({                      // Create a new engine instance
      development: true,                    // Forces assets to not be cached, turn // this off for production
    //   imagePath: "./test/"               // for custom image path
    })
    .include("Sprites, Scenes, Input, 2D, Touch, UI") // Load any needed modules
    .setup("quintusContainer")             // Use an existing canvas element
    .controls()                            // Add in default controls (keyboard, buttons)
    .touch();                              // Add in touch support (for the UI)
  
    /*
    Your game's code goes here
    */


    Q.scene("start", function(stage){
        // A basic sprite shape a asset as the image
        var sprite1 = new Q.Sprite({ x: 400, y: 100, asset: 'enemy.png', angle: 0, collisionMask: 1, scale: 1});

        // drawing red cross line on image - not sure about pink line
        sprite1.p.points = [
            [ -150, -120 ],
            [  150, -120 ],
            [  150,   60 ],
            [   90,  120 ],
            [  -90,  120 ],
            [ -150,   60 ]
        ];
        stage.insert(sprite1);
        // Add the 2D component for collision detection and gravity.
        sprite1.add('2d')

        // invoking continouse like phaser update function only for this sprite
        sprite1.on('step',function() {

        });



        // red block below image
         // A red platform for the other sprite to land on
        var sprite2 = new Q.Sprite({ x: 400, y: 600, w: 300, h: 200 });
        sprite2.draw= function(ctx) {
            ctx.fillStyle = '#FF0000';
            ctx.fillRect(-this.p.cx,-this.p.cy,this.p.w,this.p.h);
        };
        stage.insert(sprite2);




        // actions for arrow keys

        // Bind the basic inputs to different behaviors of sprite1
        // up arrow
        Q.input.on('up',stage,function(e) { 
            // this will decrease size
            sprite1.p.scale -= 0.1;
        });
    
        // down arrow
        Q.input.on('down',stage,function(e) { 
            // this will increase size
            sprite1.p.scale += 0.1;
        });
    
        // left arrow
        Q.input.on('left',stage,function(e) {
            // rotate left side
            sprite1.p.angle -= 5;
        });
    
        // right arrow
        Q.input.on('right',stage,function(e) {
            // rotate right side
            sprite1.p.angle += 5;
        });

        // space or z key pressed or button "a" pressed on-screen
        Q.input.on('fire',stage,function(e) {
            sprite1.p.vy = -600;
        });
      
        // x key pressed or button "b" pressed on-screen
        Q.input.on('action',stage,function(e) {
            sprite1.p.x = 400;
            sprite1.p.y = 100;
        });
        
    

        // learn this - http://www.html5quintus.com/guide/input.md#.XS2zMHUzar4

    })

    Q.load('enemy.png', function(){


        // start the show
        Q.stageScene("start")


        // Turn visual debugging on to see the 
        // bounding boxes and collision shapes
        Q.debug = true;

        // Turn on default keyboard controls
        Q.input.keyboardControls();

    })


  });