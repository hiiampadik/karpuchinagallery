"use client"
import {memo, useEffect} from 'react';
import Two from 'two.js';
import styles from '../common.module.scss'
const Fish = () => {
  useEffect(() => {
    // Ensure this runs only in the client
    if (typeof window === 'undefined') return;

    const $container = document.querySelector('[data-controller="fish"]');
    if (!$container) return; // Check if container exists

    const { innerWidth, innerHeight } = window;
    const toRadians = (n: number) => n * (Math.PI / 180);
    const radius = innerWidth / 7;
    const maxSpeed = 2.25;
    let angle = 0;
    let orientation = 0;
    const hover = false;
    let isInRadius = false;
    let isMouseActive = true;
    let isRadiusEntered = false;
    let timer: NodeJS.Timeout;

    const two = new Two({
      type: Two.Types['svg'],
      fullscreen: false,
      autostart: true,
    }).appendTo($container as HTMLDivElement);
    function resize() {
      two.width = innerWidth;
      two.height = innerHeight;
      two.renderer.setSize(innerWidth, innerHeight);
    }

    window.addEventListener('resize', resize, false);
    resize();

    const mouse = new Two.Vector();
    const acceleration = new Two.Vector();
    const velocity = new Two.Vector();
    const position = new Two.Vector();
    const destination = new Two.Vector();
    const circling = new Two.Vector();
    const delta = new Two.Vector();

    const r1 = two.makeSprite('/ryba.svg', two.width / 2, two.height / 2);
    // r1.scale = 0.62;
    r1.scale = 0.4;

    two.bind('update', () => {
      angle += 1;

      isInRadius = position.distanceTo(mouse) < radius;

      if (isInRadius && !isMouseActive) {
        if (!isRadiusEntered) {
          isRadiusEntered = true;
          const dot = circling.dot(acceleration);
          angle = dot >= -360 && dot <= -90 || dot >= 0 && dot <= 90 ? dot - 45 : dot + 45;
        }
        const x = radius * (hover ? 0.2 : 4) * Math.cos(toRadians(angle));
        const y = radius * (hover ? 0.2 : 4) * Math.sin(toRadians(angle));
        circling.set(x, y).addSelf(mouse).lerp(mouse, 0.8);
        destination.copy(circling);
      } else {
        isRadiusEntered = false;
        destination.copy(mouse);
      }

      acceleration.copy(destination).subSelf(position).subSelf(velocity);

      if (hover) {
        acceleration.setLength(1);
      } else if (!isMouseActive && isInRadius) {
        acceleration.setLength(0.6);
      } else {
        acceleration.setLength(0.2);
      }

      velocity.addSelf(acceleration);
      if (velocity.length() > (hover ? maxSpeed * 2 : maxSpeed)) {
        velocity.setLength(hover ? maxSpeed * 2 : maxSpeed);
      }

      // smooth transition between orientations (2 degrees per frame)
      if (!isInRadius || hover) {
        orientation = orientation === 0 ? orientation : orientation + 2;
      } else {
        if (position.distanceTo(mouse) > radius) {
          orientation = orientation === 0 ? orientation : orientation + 2;
        } else {
          const oriRot = isMouseActive ? -45 : -90;

          if (orientation < oriRot) {
            orientation = orientation === oriRot ? orientation : orientation + 2;
          } else {
            orientation = orientation === oriRot ? orientation : orientation - 2;
          }
        }
      }

      position.addSelf(velocity);
      delta.copy(mouse).subSelf(position);
      const rotation = Math.atan2(delta.y, delta.x);
      r1.rotation = rotation + toRadians(orientation);
      r1.translation.copy(position);
    }).play();

    function idle() {
      if (!isMouseActive) return;
      isMouseActive = false;
    }

    // todo multiple SVGS

    function activate() {
      if (!isMouseActive) {
        isMouseActive = true;
      }
      clearTimeout(timer);
      timer = setTimeout(idle, 200);
    }

    document.addEventListener('mousemove', (event) => {
      mouse.set(event.clientX, event.clientY);
      activate();
    });

    document.addEventListener('touchstart', (event) => {
      if (event.targetTouches) {
        mouse.set(event.targetTouches[0].clientX, event.targetTouches[0].clientY);
      }
      activate();
    });

    // can't use mouseenter because of the animation glitches on menu links
    // const $triggers = document.querySelectorAll('a, button, input, [data-action="hover>fish"]');
    // $triggers.forEach($trigger => {
    //   $trigger.addEventListener('mouseenter', () => {
    //     hover = true;
    //   });
    //   $trigger.addEventListener('mouseleave', () => {
    //     hover = false;
    //   });
    // });

    return () => {
      // Cleanup event listeners and the animation
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', activate);
      document.removeEventListener('touchstart', activate);
      two.pause();
    };
  }, []);

  return <div data-controller="fish" className={styles.fish} style={{ width: '100%', height: '100%' }} />;
};

export default memo(Fish, () => true);

