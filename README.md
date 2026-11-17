# Dance for Singapore
I am working on a dance app for a local competition where the theme is robots meet culture, so the idea is to make a software based dance game that will help users traditional dances and compete with their friends through dancing. The project comes with a physical booth set up as well with a servo bot and all that dances along with the song in the game. The idea is to roll this out in Singapore Primary and Secondary schools as part of the National Education syllabus. Hopefully, the game can help students get a good introduction to the art of dance and understand other cultures in Singapore better.

## Tech Stack
- Migrated from Electron to Vite as the full app is frontend
- React JS
- Google Mediapipe Landmark Pose Detector model
  - The 33 output coordinate vectors are taken in a 2D plane to calculate the angles between each joint.
  - Each pose will be detected within 2-3 seconds.
  - The dances are essentially timestamps of poses on the 2D plane (limitation to Servo Bot can be compatible with all the moves)

## Dataset Generation

The tedious generation of datasets were done using a mix of Claude, Gemini and a local Qwen 3.6 35b:3Ab instance. Frontend UI was done manually by me. Most of the boilerplates like loading mediapipe, checking angles etc... was done by Claude. Obviously, I still need a technical know how on how the code all works as even though Claude lays the foundational systems and boilerplates, I still have to edit and make sure small things work correctly and fix certain bugs.

## Learn Mode
The aim is to let the user learn the moves at their own time rather than having to care about the beat and song etc... Additionally, the detection is more strict on this mode.
<img width="3024" height="1964" alt="image" src="https://github.com/user-attachments/assets/edbb0159-3b6d-4cfd-aa5c-97a02803c1a3" />

## Compete Mode Walkthrough
The main mode where the user will try playing the game to set a new high score in different songs to better learn the cultural dances.

*do note that some of the poses are not detected properly due to me not being completely in the frame.

https://github.com/user-attachments/assets/16bfd12b-1505-40d2-ad96-1f8e6b0443c4

## Main Menu Screen
<img width="1512" height="949" alt="Screenshot 2026-09-14 at 11 46 34 AM" src="https://github.com/user-attachments/assets/66f646ff-a767-4d9a-beb0-3d78041bc320" />

## Select Song Screen
<img width="1512" height="949" alt="Screenshot 2026-09-14 at 11 46 57 AM" src="https://github.com/user-attachments/assets/dbf5884d-91a8-49c5-bded-11c80c8c62f4" />

## Options Menu
<img width="1512" height="949" alt="Screenshot 2026-09-14 at 11 46 37 AM" src="https://github.com/user-attachments/assets/8f132a06-ee9b-49c0-9f9d-f34b379225e9" />

## Leaderboards Menu

<img width="1512" height="949" alt="Screenshot 2026-09-09 at 12 56 28 PM" src="https://github.com/user-attachments/assets/d420d9ea-ca03-463c-b2d1-36b6feccfcf7" />

## Servo bot
6 Servo humanoid suspended on a 3D printed beam. All parts were designed and 3D printed by me.

<img width="4096" height="2304" alt="0fa19b89-ad6f-436d-8919-65a49b002e5c" src="https://github.com/user-attachments/assets/139ea99a-6af7-4b28-8a12-fc95cff9ac8d" />

## Main Booth Device
Consists of a high FOV web camera, external Speaker and an ESP system to control the RGB strip at the top for user feedback and the Servo Bot. The entire system is driven by a binned school laptop. 

This ties in with Singapore's electronics waste collection and sets up a potential partnership with NEA or MOE for binned laptops for mass rollout, reducing cost by hundreds as compared to using a Raspberry Pi or Latte Panda while offering superior performance. I personal got a binned laptop from my junior where the keyboard and screen didn't work very well, but the motherboard and functionality works, thus making it perfect for my use case.

<img width="4096" height="2304" alt="627b66bb-af2d-4def-9f64-018ecd1d71dd" src="https://github.com/user-attachments/assets/e6df0b5c-f2b4-4e63-96cc-a9fc1a2bc736" />


# sutd-wth

