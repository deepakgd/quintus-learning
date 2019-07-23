window.addEventListener('load', function(){
    var Q = window.Q = Quintus({                  // Create a new engine instance
        development: true,               // Forces assets to not be cached, turn
                                         // this off for production
      })
      .include("Sprites, Scenes, Input, Anim, 2D, Touch, UI, TMX") // Load all kiiinds of modules
      .setup({ 
        maximize: true
       })
      .controls(true)   //changed to joystick                    // Add in default controls (keyboard, buttons)
      .touch();                          // Add in touch support (for the UI)

    // create player and player actions
    Q.Sprite.extend("Player",{
        init: function(p) {
            this._super(p, { 
                // v1
                //asset: "mario.png",  // player image
                //v1

                // v2 - adding animation sprite
                sprite: "mario", // Instead of using 'asset' for static images, we're
                sheet: "mario",  // using 'sprite' to specify the animation set and
                                // 'sheet' to specify the sprite sheet used

                jumpSpeed: -400, // jump height
                speed: 300, //mario running speed
                inMidair: false
            });

            // Platformer controls bind to left, and right and allow the player to jump. and animation enabled to sprite
            this.add('2d, animation, platformerControls'); 
        },
        step: function(dt) {
            // 'jumping' is only true when the user is actively pressing the jump
            // button, but we're interested in the whole arc of the jump, so we
            // manually update this 'inMidair' variable.
            if(this.p.jumping) {
                this.inMidair = true;
            }
            if(this.p.landed > 0) {
                this.inMidair = false;
            }

            // Play the jumping animation if Mario is in mid-air
            if(this.inMidair) {
                this.play('jump');
            }
            // Play the running animation if we're on the ground and moving
            else if (this.p.vx != 0) {
                this.play('run');
            }else {
                this.play('stand');
            }

            // turn left and right mario  
            if(Q.inputs['left'] && this.p.direction == 'right') {
                this.p.flip = 'x';
            }else if(Q.inputs['right']  && this.p.direction == 'left') {
                this.p.flip = false;                    
            }
        }                    
    });

    // create level1 
    Q.scene("level1", function(stage) {
        //  draw as per map.tmx design  
        Q.stageTMX("map.tmx", stage);
        // add player to scene
        var player = stage.insert(new Q.Player({ x: 13*16 + 8, y: 24*16 + 8}));
        // follow camera to player
        stage.add("viewport").follow(player,{x: true, y: true},{minX: 0, maxX: 256*16, minY: 0, maxY: 32*16});
    });

    // load tmx and mario file
    Q.loadTMX("map.tmx, sprites.png, sprites.json", function() {
        Q.compileSheets("sprites.png", "sprites.json");


        // ref animation - http://www.html5quintus.com/guide/animation.md#.XS61oXUzar4
        /* Animation object
            frames: an array of frame numbers that make up the animation
            rate: second per frame, best expressed as a fraction
            loop: defaults to true, which plays the animation over and over. Set to false to have it play once
            next: the animation to play directly after this one (automatically sets loop to false)
            trigger: event to trigger when the animation is done - useful for doing something (like adding a bullet sprite) when the animation is done playing.
         */
        Q.animations('mario', {
            stand: { frames: [1] },
            run: { frames: [2,3,4,3], rate: 1/4 },
            jump: { frames: [6] }
        })


        Q.stageScene("level1");
    });


})