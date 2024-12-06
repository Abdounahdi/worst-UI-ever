'use strict';

        const modal = document.getElementById('quitModal');
        const quitButton = document.getElementById('quitButton');
        const yesButton = document.getElementById('yesButton');
        const cancelButton = document.getElementById('cancelButton');

        function createFly() {
            const fly = document.createElement('div');
            fly.className = 'fly';
            fly.innerHTML = '<img src="https://i.pinimg.com/originals/96/63/18/966318c15fa30308c741a6f20b10ae60.png" alt="fly">';
            document.body.appendChild(fly);

            const duration = Math.random() * 3000 + 3000;
        
            const waypoints = [];
            for (let i = 0; i < 10; i++) {
                waypoints.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight
                });
            }

            let currentWaypoint = 0;
            let startTime = Date.now();

            function animateFly() {
                const now = Date.now();
                const elapsed = now - startTime;
                const progress = elapsed / duration;

                if (progress >= 1) {
                    fly.remove();
                    return;
                }

                const currentIndex = Math.floor(progress * (waypoints.length - 1));
                const nextIndex = Math.min(currentIndex + 1, waypoints.length - 1);
                
                const current = waypoints[currentIndex];
                const next = waypoints[nextIndex];

                const segmentProgress = (progress * (waypoints.length - 1)) % 1;
                const x = current.x + (next.x - current.x) * segmentProgress;
                const y = current.y + (next.y - current.y) * segmentProgress;


                const wiggle = Math.sin(elapsed / 100) * 20;
                
                fly.style.left = `${x + wiggle}px`;
                fly.style.top = `${y + wiggle}px`;

                const angle = Math.atan2(next.y - current.y, next.x - current.x) * 180 / Math.PI;
                fly.style.transform = `rotate(${angle}deg)`;

                requestAnimationFrame(animateFly);
            }

            animateFly();
        }

        function randomFly() {
            if (Math.random() < 0.5) { 
                createFly();
            }
            setTimeout(randomFly, Math.random() * 4000 + 1000);
        }

        randomFly();

        function getRandomInputPosition() {
            const padding = 20;
            const maxX = window.innerWidth - 200;
            const maxY = window.innerHeight - 50; 
            
            return {
                left: Math.max(padding, Math.floor(Math.random() * maxX)) + 'px',
                top: Math.max(padding, Math.floor(Math.random() * maxY)) + 'px'
            };
        }


        function randomizeInputPositions() {
            const inputs = document.querySelectorAll('input, select, textarea, meter, progress');
            inputs.forEach(input => {
                const pos = getRandomInputPosition();
                input.style.position = 'fixed';
                input.style.left = pos.left;
                input.style.top = pos.top;
                

                const rotation = Math.random() * 360;
                input.style.transform = `rotate(${rotation}deg)`;
            });
        }

        const inputs = document.querySelectorAll('input, select, textarea, meter, progress');
        inputs.forEach(input => {
            input.addEventListener('click', (e) => {
                e.stopPropagation(); 
                randomizeInputPositions();
            });
        });


        randomizeInputPositions();

        function getRandomPosition() {
            const maxX = window.innerWidth - modal.offsetWidth;
            const maxY = window.innerHeight - modal.offsetHeight;
            
            const randomX = Math.max(0, Math.floor(Math.random() * maxX));
            const randomY = Math.max(0, Math.floor(Math.random() * maxY));
            
            return { x: randomX, y: randomY };
        }

        function moveModal() {
            const position = getRandomPosition();
            modal.style.left = position.x + 'px';
            modal.style.top = position.y + 'px';
        }

        function createLaughingDog() {
            const dog = document.createElement('div');
            dog.className = 'laughing-dog';
            

            const corners = [
                { top: '20px', left: '20px' },
                { top: '20px', right: '20px' },
                { bottom: '20px', left: '20px' },
                { bottom: '20px', right: '20px' }
            ];
            const position = corners[Math.floor(Math.random() * corners.length)];
            Object.assign(dog.style, position);

            dog.innerHTML = `
                <img src="https://media.tenor.com/5btWB6sfNuQAAAAM/johnlvr.gif" class="dog-image" alt="laughing dog">
            `;
            
            document.body.appendChild(dog);

            setTimeout(() => {
                dog.remove();
            }, 2000);
        }

        quitButton.addEventListener('click', () => {
            modal.style.display = 'block';
            moveModal();
        });

        yesButton.addEventListener('click', () => {
            moveModal();
            createLaughingDog();
        });

        cancelButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });


        const hereButton = document.getElementById('hereButton');
        const haroldModal = document.getElementById('haroldModal');

        hereButton.addEventListener('click', () => {
            haroldModal.classList.add('loading');

            setTimeout(() => {
                haroldModal.classList.remove('loading');
            }, 4500); 
        });

        setTimeout(() => {
            const countdownContainer = document.getElementById('countdownContainer');
            const countdownEl = document.getElementById('countdown');
            const darkOverlay = document.getElementById('darkOverlay');
            const quickButton = document.getElementById('quickButton');
            let count = 6;
            let mouseX = 0;
            let mouseY = 0;
            

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });
            
            countdownContainer.style.display = 'block';
            darkOverlay.style.display = 'block';


            function getDistance(x1, y1, x2, y2) {
                return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            }


            function moveToRandomPosition(force = false) {
                const containerRect = countdownContainer.getBoundingClientRect();
                const containerCenterX = containerRect.left + containerRect.width / 2;
                const containerCenterY = containerRect.top + containerRect.height / 2;
                

                const distance = getDistance(mouseX, mouseY, containerCenterX, containerCenterY);

                if (force || distance < 200) {
                    const maxX = window.innerWidth - countdownContainer.offsetWidth;
                    const maxY = window.innerHeight - countdownContainer.offsetHeight;
                    

                    let randomX, randomY;
                    if (distance < 200) {

                        const angleAway = Math.atan2(containerCenterY - mouseY, containerCenterX - mouseX);
                        const moveDistance = 300;
                        
                        randomX = Math.max(0, Math.min(maxX, containerCenterX + Math.cos(angleAway) * moveDistance));
                        randomY = Math.max(0, Math.min(maxY, containerCenterY + Math.sin(angleAway) * moveDistance));
                    } else {
                        randomX = Math.max(0, Math.floor(Math.random() * maxX));
                        randomY = Math.max(0, Math.floor(Math.random() * maxY));
                    }
                    
                    countdownContainer.style.left = randomX + 'px';
                    countdownContainer.style.top = randomY + 'px';
                    countdownContainer.style.transform = 'none';
                }
            }
            
            const mouseCheckInterval = setInterval(() => {
                moveToRandomPosition();
            }, 100);
            
            const timer = setInterval(() => {
                if (count >= -3) {
                    countdownEl.textContent = count;
                    moveToRandomPosition(true); 
                    

                    const darkness = (6 - count) * 0.1;
                    darkOverlay.style.opacity = darkness;

                    if (count <= 3) {
                        countdownEl.classList.add('negative');
                    }
                    
                    count--;
                } else {
                    clearInterval(timer);
                    clearInterval(mouseCheckInterval);
                    countdownEl.textContent = "try again later";
                    countdownEl.classList.add('message');
                    

                    setTimeout(() => {
                        darkOverlay.style.opacity = '0';
                        setTimeout(() => {
                            countdownContainer.style.display = 'none';
                            darkOverlay.style.display = 'none';
                        }, 1000);
                    }, 1000);
                }
            }, 1000);


            quickButton.addEventListener('click', () => {
                clearInterval(timer);
                clearInterval(mouseCheckInterval);
                countdownContainer.style.display = 'none';
                darkOverlay.style.opacity = '0';
                darkOverlay.style.display = 'none';
            });
        }, 5000); 