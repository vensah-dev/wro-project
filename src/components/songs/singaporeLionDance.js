// ============================================================
// SONG: Singapore Lion Dance instrumental (舞狮 / 醒狮 percussion)
// ============================================================
// This is a placeholder — no actual track ships with this file. Drop a
// licensed instrumental (typically drum/gong/cymbal percussion, as used
// in Singapore-style Southern lion dance) at
// src/renderer/src/assets/singapore-lion-dance-song.mp3
// (or point audioSrc at wherever you host it) before running this song.
//
// RESEARCH NOTE — this file draws on real Southern (Nanshi/Cantonese-
// style) lion dance vocabulary as commonly performed and taught by
// Singapore lion dance troupes, not generic "arms up / arms out" shapes:
//   - 起势 (qi shi, "ready stance"): performer crouches low, forearms
//     crossed and drawn in tight to the chest — the stance a performer
//     takes just before lifting the lion head.
//   - 马步扎功 (ma bu zha gong, "horse-stance root work"): a deep, wide
//     horse stance with both forearms held out in front at chest
//     height, as if gripping the lion head's internal handles.
//   - 采青 (cai qing, "plucking the greens"): the lion reaches up and
//     out to take the hung "greens" (lettuce/hongbao) — one arm
//     extends fully overhead while the other hangs straight at the
//     side, a genuinely asymmetric reach-and-anchor shape.
//   - 抓痒 (zhua yang, "scratching an itch"): a comic beat where one
//     arm curls sharply up near the head/ear while the other stays
//     bent low at the waist.
//   - 摇头晃脑 (yao tou huang nao, "head shake / sway"): the lion sways
//     its head side to side — modeled here as both hands staying near
//     the chest but trading which side is further out, a horizontal
//     analogue to the vertical cloud-hands flow.
//   - 高桩望青 (gao zhuang wang qing, "high pole, gazing for the
//     greens"): performer rises tall on straight legs with both arms
//     reaching straight up and outward in a wide V, scanning for the
//     greens from height.
//   - 打滚 (da gun, "rolling"): the lion drops and rolls low to the
//     ground — the deepest crouch in the set, arms tucked tight and
//     low, close together.
//   - 拜三拜 (bai san bai, "three bows"): the traditional greeting bow
//     performed to the host/audience — hands pressed together at chest
//     centre, torso inclined forward.
//   - 狮子回首 (shizi hui shou, "lion looks back"): a twisting look-back
//     beat — one arm extends out to the side while the other crosses
//     in tight across the chest, an asymmetric combination distinct
//     from the overhead reaches used elsewhere in this set.
//   - 蹲伏待跃 (dun fu dai yue, "crouched, ready to leap"): a coiled,
//     low stance with both arms pulled back close to the torso,
//     loading for an explosive move.
//   - 腾跃采青 (teng yue cai qing, "leaping to pluck the greens"): the
//     explosive payoff move — one leg drives while the opposite arm
//     shoots straight overhead, modeled with a custom score on knee
//     asymmetry plus a fully extended reaching arm.
//   - 直立昂首 (zhi li ang shou, "standing tall, head held high"): the
//     closing triumphant pose — straight legs, both arms extended on a
//     diagonal up and out.
// As with the fan dance file, real lion-head handling (the separate
// head/tail performers, pole grip changes, footwork timing to the
// drum) lives in prop and multi-performer coordination that 2D
// single-body shoulder/elbow/knee tracking can't resolve. The moves
// below capture the solo performer's body/arm SHAPE for each named
// position, stay purely front-facing, and don't attempt to track the
// lion head prop itself.
//
// `moves` follows the same shape as the other song files' DANCE_MOVES:
// pose criteria + ranges (or a customScore for asymmetric/flowing
// poses), `hints` / `genericHint` for Learn mode, and a `target`
// skeleton for overlay.

import audioSrc from '../../assets/music/lion-dance-song.mp3';
import { scoreRange } from '../geometry';
import { CONFIG } from '../config';

// ============================================================
// DANCE MOVE DATASET — Singapore-style lion dance body positions
// (used as singaporeLionDance.js's `moves` array).
// ============================================================
export const DANCE_MOVES = [
  {
    id: 'qi-shi',
    label: 'Qi Shi 起势 (ready stance — low crouch, forearms crossed tight at the chest)',
    ranges: {
      leftKnee: [120, 150], rightKnee: [120, 150],
      leftElbow: [40, 80], rightElbow: [40, 80],
      leftShoulder: [15, 45], rightShoulder: [15, 45],
      wristGap: [0.2, 0.8],
    },
    hints: {
      leftKnee: { low: 'Sink a little deeper into your left leg', high: 'Rise slightly out of your left knee' },
      rightKnee: { low: 'Sink a little deeper into your right leg', high: 'Rise slightly out of your right knee' },
      leftElbow: { low: 'Fold your left forearm in tighter across your chest', high: 'Let your left elbow open slightly' },
      rightElbow: { low: 'Fold your right forearm in tighter across your chest', high: 'Let your right elbow open slightly' },
      leftShoulder: { low: null, high: 'Keep your left arm low and close to your body' },
      rightShoulder: { low: null, high: 'Keep your right arm low and close to your body' },
      wristGap: { low: null, high: 'Cross your hands in closer together at your chest' },
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.40, y: 0.44 }, rightElbow: { x: 0.60, y: 0.44 },
      leftWrist: { x: 0.54, y: 0.42 }, rightWrist: { x: 0.46, y: 0.42 },
      leftHip: { x: 0.42, y: 0.60 }, rightHip: { x: 0.58, y: 0.60 },
      leftKnee: { x: 0.38, y: 0.78 }, rightKnee: { x: 0.62, y: 0.78 },
      leftAnkle: { x: 0.36, y: 0.96 }, rightAnkle: { x: 0.64, y: 0.96 },
      leftHeel: { x: 0.34, y: 0.98 }, rightHeel: { x: 0.66, y: 0.98 },
      leftFootIndex: { x: 0.38, y: 1.00 }, rightFootIndex: { x: 0.62, y: 1.00 },
    },
  },
  {
    id: 'ma-bu-zha-gong',
    label: 'Ma Bu Zha Gong 马步扎功 (horse-stance root work — wide low stance, arms gripping forward)',
    ranges: {
      leftKnee: [100, 135], rightKnee: [100, 135],
      leftElbow: [80, 120], rightElbow: [80, 120],
      leftShoulder: [60, 90], rightShoulder: [60, 90],
      wristGap: [1.0, 1.8],
    },
    hints: {
      leftKnee: { low: 'Sink deeper into your horse stance on the left', high: 'Rise slightly out of your left knee' },
      rightKnee: { low: 'Sink deeper into your horse stance on the right', high: 'Rise slightly out of your right knee' },
      leftElbow: { low: 'Bend your left elbow a bit more', high: 'Straighten your left elbow slightly' },
      rightElbow: { low: 'Bend your right elbow a bit more', high: 'Straighten your right elbow slightly' },
      leftShoulder: { low: 'Raise your left arm up toward chest height', high: 'Lower your left arm slightly' },
      rightShoulder: { low: 'Raise your right arm up toward chest height', high: 'Lower your right arm slightly' },
      wristGap: { low: 'Widen your grip slightly, hands further apart', high: 'Bring your hands a little closer together' },
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.36, y: 0.42 }, rightElbow: { x: 0.64, y: 0.42 },
      leftWrist: { x: 0.36, y: 0.36 }, rightWrist: { x: 0.64, y: 0.36 },
      leftHip: { x: 0.40, y: 0.58 }, rightHip: { x: 0.60, y: 0.58 },
      leftKnee: { x: 0.32, y: 0.76 }, rightKnee: { x: 0.68, y: 0.76 },
      leftAnkle: { x: 0.28, y: 0.96 }, rightAnkle: { x: 0.72, y: 0.96 },
      leftHeel: { x: 0.26, y: 0.98 }, rightHeel: { x: 0.74, y: 0.98 },
      leftFootIndex: { x: 0.30, y: 1.00 }, rightFootIndex: { x: 0.70, y: 1.00 },
    },
  },
  {
    id: 'cai-qing-right',
    label: 'Cai Qing 采青 — Right (plucking the greens: right arm reaches full overhead, left hangs straight)',
    ranges: {
      leftKnee: [140, 170], rightKnee: [140, 170],
      rightShoulder: [160, 180], rightElbow: [150, 180],
      leftShoulder: [5, 30], leftElbow: [140, 180],
    },
    hints: {
      leftKnee: { low: 'Straighten your left leg a bit', high: 'Relax your left knee slightly' },
      rightKnee: { low: 'Straighten your right leg a bit', high: 'Relax your right knee slightly' },
      rightShoulder: { low: 'Reach your right arm further up overhead', high: 'Lower your right arm slightly' },
      rightElbow: { low: 'Straighten your right arm fully on the reach', high: null },
      leftShoulder: { low: null, high: 'Let your left arm hang straight down at your side' },
      leftElbow: { low: 'Straighten your left arm down at your side', high: null },
    },
    genericHint: 'Reach your right arm straight up overhead to pluck the greens, while your left arm hangs straight down at your side',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.42, y: 0.48 }, rightElbow: { x: 0.60, y: 0.14 },
      leftWrist: { x: 0.42, y: 0.64 }, rightWrist: { x: 0.62, y: 0.00 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'zhua-yang',
    label: 'Zhua Yang 抓痒 (scratching an itch — one hand curls up near the ear, the other bends low at the waist)',
    ranges: {
      leftKnee: [150, 180], rightKnee: [150, 180],
      rightShoulder: [140, 175], rightElbow: [30, 70],
      leftShoulder: [15, 40], leftElbow: [60, 100],
    },
    hints: {
      leftKnee: { low: 'Straighten your left leg a bit', high: 'Relax your left knee slightly' },
      rightKnee: { low: 'Straighten your right leg a bit', high: 'Relax your right knee slightly' },
      rightShoulder: { low: 'Raise your right arm higher, up toward your head', high: 'Lower your right arm slightly' },
      rightElbow: { low: 'Curl your right hand in closer to your ear', high: 'Let your right elbow open slightly' },
      leftShoulder: { low: null, high: 'Keep your left arm low, near your waist' },
      leftElbow: { low: 'Bend your left elbow a bit more', high: 'Straighten your left elbow slightly' },
    },
    genericHint: 'Curl your right hand up near your ear like the lion scratching an itch, left hand stays bent low near your waist',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.40, y: 0.46 }, rightElbow: { x: 0.66, y: 0.24 },
      leftWrist: { x: 0.46, y: 0.52 }, rightWrist: { x: 0.62, y: 0.10 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'yao-tou-huang-nao',
    label: 'Yao Tou Huang Nao 摇头晃脑 (head shake/sway — hands trade sides in front of the chest)',
    customScore: (a) => {
      const bentEnough = (v) => scoreRange(v, [90, 140], CONFIG.ANGLE_TOLERANCE_DEG);
      const wristHorizontalOffset = Math.abs(a.leftWristX - a.rightWristX);
      return (
        bentEnough(a.leftElbow) * 0.25 +
        bentEnough(a.rightElbow) * 0.25 +
        scoreRange(wristHorizontalOffset, [0.05, 0.25], CONFIG.ANGLE_TOLERANCE_DEG) * 0.5
      );
    },
    genericHint: 'Keep both hands bent in front of your chest and sway them gently side to side, like the lion shaking its head',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.36, y: 0.44 }, rightElbow: { x: 0.60, y: 0.44 },
      leftWrist: { x: 0.34, y: 0.38 }, rightWrist: { x: 0.50, y: 0.40 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'gao-zhuang-wang-qing',
    label: 'Gao Zhuang Wang Qing 高桩望青 (high pole, gazing for the greens — tall stance, arms in a wide overhead V)',
    ranges: {
      leftKnee: [165, 180], rightKnee: [165, 180],
      leftElbow: [150, 180], rightElbow: [150, 180],
      leftShoulder: [150, 175], rightShoulder: [150, 175],
      wristGap: [2.0, 3.2],
    },
    hints: {
      leftKnee: { low: 'Stand up taller on your left leg', high: null },
      rightKnee: { low: 'Stand up taller on your right leg', high: null },
      leftElbow: { low: 'Straighten your left arm fully', high: null },
      rightElbow: { low: 'Straighten your right arm fully', high: null },
      leftShoulder: { low: 'Reach your left arm higher up and out', high: 'Lower your left arm slightly' },
      rightShoulder: { low: 'Reach your right arm higher up and out', high: 'Lower your right arm slightly' },
      wristGap: { low: 'Open your arms wider apart overhead', high: null },
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.28, y: 0.14 }, rightElbow: { x: 0.72, y: 0.14 },
      leftWrist: { x: 0.14, y: 0.00 }, rightWrist: { x: 0.86, y: 0.00 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'da-gun',
    label: 'Da Gun 打滚 (rolling — deepest crouch, arms tucked tight and low)',
    ranges: {
      leftKnee: [90, 125], rightKnee: [90, 125],
      leftElbow: [30, 70], rightElbow: [30, 70],
      leftShoulder: [0, 20], rightShoulder: [0, 20],
      wristGap: [0.1, 0.6],
    },
    hints: {
      leftKnee: { low: 'Sink lower into your left leg', high: 'Rise slightly out of your left knee' },
      rightKnee: { low: 'Sink lower into your right leg', high: 'Rise slightly out of your right knee' },
      leftElbow: { low: 'Tuck your left forearm in tighter', high: 'Let your left elbow open slightly' },
      rightElbow: { low: 'Tuck your right forearm in tighter', high: 'Let your right elbow open slightly' },
      leftShoulder: { low: null, high: 'Keep your left arm pinned low against your body' },
      rightShoulder: { low: null, high: 'Keep your right arm pinned low against your body' },
      wristGap: { low: null, high: 'Bring your hands even closer together' },
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.34 }, rightShoulder: { x: 0.58, y: 0.34 },
      leftElbow: { x: 0.42, y: 0.46 }, rightElbow: { x: 0.58, y: 0.46 },
      leftWrist: { x: 0.48, y: 0.52 }, rightWrist: { x: 0.52, y: 0.52 },
      leftHip: { x: 0.40, y: 0.62 }, rightHip: { x: 0.60, y: 0.62 },
      leftKnee: { x: 0.34, y: 0.80 }, rightKnee: { x: 0.66, y: 0.80 },
      leftAnkle: { x: 0.30, y: 0.96 }, rightAnkle: { x: 0.70, y: 0.96 },
      leftHeel: { x: 0.28, y: 0.98 }, rightHeel: { x: 0.72, y: 0.98 },
      leftFootIndex: { x: 0.32, y: 1.00 }, rightFootIndex: { x: 0.68, y: 1.00 },
    },
  },
  {
    id: 'bai-san-bai',
    label: 'Bai San Bai 拜三拜 (three bows — hands pressed together at chest centre, torso inclined forward)',
    ranges: {
      leftKnee: [140, 165], rightKnee: [140, 165],
      leftElbow: [70, 110], rightElbow: [70, 110],
      leftShoulder: [40, 70], rightShoulder: [40, 70],
      wristGap: [0, 0.4],
    },
    hints: {
      leftKnee: { low: 'Bend your left knee a touch more into the bow', high: 'Straighten your left leg slightly' },
      rightKnee: { low: 'Bend your right knee a touch more into the bow', high: 'Straighten your right leg slightly' },
      leftElbow: { low: 'Bend your left elbow a bit more', high: 'Open your left elbow slightly' },
      rightElbow: { low: 'Bend your right elbow a bit more', high: 'Open your right elbow slightly' },
      leftShoulder: { low: 'Raise your left arm a little toward chest height', high: 'Lower your left arm slightly' },
      rightShoulder: { low: 'Raise your right arm a little toward chest height', high: 'Lower your right arm slightly' },
      wristGap: { low: null, high: 'Bring your palms together at your chest' },
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.40, y: 0.44 }, rightElbow: { x: 0.60, y: 0.44 },
      leftWrist: { x: 0.49, y: 0.42 }, rightWrist: { x: 0.51, y: 0.42 },
      leftHip: { x: 0.43, y: 0.62 }, rightHip: { x: 0.57, y: 0.62 },
      leftKnee: { x: 0.42, y: 0.80 }, rightKnee: { x: 0.58, y: 0.80 },
      leftAnkle: { x: 0.42, y: 0.96 }, rightAnkle: { x: 0.58, y: 0.96 },
      leftHeel: { x: 0.40, y: 0.98 }, rightHeel: { x: 0.60, y: 0.98 },
      leftFootIndex: { x: 0.44, y: 1.00 }, rightFootIndex: { x: 0.56, y: 1.00 },
    },
  },
  {
    id: 'shizi-hui-shou',
    label: 'Shizi Hui Shou 狮子回首 (lion looks back — one arm out to the side, the other crossed tight over the chest)',
    ranges: {
      leftKnee: [150, 180], rightKnee: [150, 180],
      rightShoulder: [80, 110], rightElbow: [140, 175],
      leftShoulder: [40, 70], leftElbow: [60, 100],
    },
    hints: {
      leftKnee: { low: 'Straighten your left leg a bit', high: 'Relax your left knee slightly' },
      rightKnee: { low: 'Straighten your right leg a bit', high: 'Relax your right knee slightly' },
      rightShoulder: { low: 'Raise your right arm up to shoulder height', high: 'Lower your right arm to shoulder height' },
      rightElbow: { low: 'Soften your right elbow into more of a gentle arc', high: 'Relax your right elbow — don\u2019t lock it straight' },
      leftShoulder: { low: 'Raise your left arm a little toward chest height', high: 'Lower your left arm slightly' },
      leftElbow: { low: 'Cross your left forearm in tighter across your chest', high: 'Let your left elbow open slightly' },
    },
    genericHint: 'Reach your right arm straight out to the side while your left arm crosses in tight across your chest, as if looking back over your shoulder',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.40, y: 0.44 }, rightElbow: { x: 0.82, y: 0.32 },
      leftWrist: { x: 0.64, y: 0.40 }, rightWrist: { x: 0.98, y: 0.32 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
  {
    id: 'dun-fu-dai-yue',
    label: 'Dun Fu Dai Yue 蹲伏待跃 (crouched, ready to leap — coiled low stance, arms pulled back close to the torso)',
    ranges: {
      leftKnee: [95, 130], rightKnee: [95, 130],
      leftElbow: [100, 140], rightElbow: [100, 140],
      leftShoulder: [0, 20], rightShoulder: [0, 20],
      wristGap: [0.5, 1.2],
    },
    hints: {
      leftKnee: { low: 'Sink lower into your left leg to load the stance', high: 'Rise slightly out of your left knee' },
      rightKnee: { low: 'Sink lower into your right leg to load the stance', high: 'Rise slightly out of your right knee' },
      leftElbow: { low: 'Draw your left elbow back a little more', high: 'Bring your left elbow forward slightly' },
      rightElbow: { low: 'Draw your right elbow back a little more', high: 'Bring your right elbow forward slightly' },
      leftShoulder: { low: null, high: 'Keep your left arm pulled in low, coiled at your side' },
      rightShoulder: { low: null, high: 'Keep your right arm pulled in low, coiled at your side' },
      wristGap: { low: 'Draw your hands slightly further apart', high: 'Bring your hands slightly closer together' },
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.34 }, rightShoulder: { x: 0.58, y: 0.34 },
      leftElbow: { x: 0.38, y: 0.42 }, rightElbow: { x: 0.62, y: 0.42 },
      leftWrist: { x: 0.34, y: 0.50 }, rightWrist: { x: 0.66, y: 0.50 },
      leftHip: { x: 0.40, y: 0.62 }, rightHip: { x: 0.60, y: 0.62 },
      leftKnee: { x: 0.34, y: 0.80 }, rightKnee: { x: 0.66, y: 0.80 },
      leftAnkle: { x: 0.30, y: 0.96 }, rightAnkle: { x: 0.70, y: 0.96 },
      leftHeel: { x: 0.28, y: 0.98 }, rightHeel: { x: 0.72, y: 0.98 },
      leftFootIndex: { x: 0.32, y: 1.00 }, rightFootIndex: { x: 0.68, y: 1.00 },
    },
  },
  {
    id: 'teng-yue-cai-qing',
    label: 'Teng Yue Cai Qing 腾跃采青 (leaping to pluck the greens — explosive overhead reach off an asymmetric stance)',
    customScore: (a) => {
      const straightArm = (v) => scoreRange(v, [150, 180], CONFIG.ANGLE_TOLERANCE_DEG);
      const kneeAsymmetry = Math.abs(a.leftKnee - a.rightKnee);
      return (
        straightArm(a.rightElbow) * 0.3 +
        scoreRange(a.rightShoulder, [160, 180], CONFIG.ANGLE_TOLERANCE_DEG) * 0.3 +
        scoreRange(kneeAsymmetry, [20, 50], CONFIG.ANGLE_TOLERANCE_DEG) * 0.4
      );
    },
    genericHint: 'Push off through one leg while your right arm shoots straight up overhead, as if leaping to pluck the greens',
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.40, y: 0.46 }, rightElbow: { x: 0.60, y: 0.14 },
      leftWrist: { x: 0.44, y: 0.54 }, rightWrist: { x: 0.62, y: 0.00 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.40, y: 0.84 }, rightKnee: { x: 0.60, y: 0.74 },
      leftAnkle: { x: 0.38, y: 0.98 }, rightAnkle: { x: 0.62, y: 0.94 },
      leftHeel: { x: 0.36, y: 1.00 }, rightHeel: { x: 0.64, y: 0.96 },
      leftFootIndex: { x: 0.40, y: 1.00 }, rightFootIndex: { x: 0.60, y: 0.98 },
    },
  },
  {
    id: 'zhi-li-ang-shou',
    label: 'Zhi Li Ang Shou 直立昂首 (standing tall, head held high — closing pose, arms extended on a diagonal up and out)',
    ranges: {
      leftKnee: [165, 180], rightKnee: [165, 180],
      leftElbow: [160, 180], rightElbow: [160, 180],
      leftShoulder: [110, 140], rightShoulder: [110, 140],
      wristGap: [2.5, 3.5],
    },
    hints: {
      leftKnee: { low: 'Stand up taller on your left leg', high: null },
      rightKnee: { low: 'Stand up taller on your right leg', high: null },
      leftElbow: { low: 'Straighten your left arm fully', high: null },
      rightElbow: { low: 'Straighten your right arm fully', high: null },
      leftShoulder: { low: 'Raise your left arm higher onto the diagonal', high: 'Lower your left arm slightly' },
      rightShoulder: { low: 'Raise your right arm higher onto the diagonal', high: 'Lower your right arm slightly' },
      wristGap: { low: 'Open your arms even wider apart', high: null },
    },
    target: {
      leftShoulder: { x: 0.42, y: 0.32 }, rightShoulder: { x: 0.58, y: 0.32 },
      leftElbow: { x: 0.24, y: 0.22 }, rightElbow: { x: 0.76, y: 0.22 },
      leftWrist: { x: 0.06, y: 0.12 }, rightWrist: { x: 0.94, y: 0.12 },
      leftHip: { x: 0.44, y: 0.62 }, rightHip: { x: 0.56, y: 0.62 },
      leftKnee: { x: 0.44, y: 0.80 }, rightKnee: { x: 0.56, y: 0.80 },
      leftAnkle: { x: 0.44, y: 0.96 }, rightAnkle: { x: 0.56, y: 0.96 },
      leftHeel: { x: 0.42, y: 0.98 }, rightHeel: { x: 0.58, y: 0.98 },
      leftFootIndex: { x: 0.46, y: 1.00 }, rightFootIndex: { x: 0.54, y: 1.00 },
    },
  },
];

// Generic across songs — searches whichever `moves` array is handed to it.
export const getMoveById = (moves, id) => moves.find((m) => m.id === id) || null;

// Generic criterion -> limb mapping, same as the other song files. In
// practice this (and getMoveById above) probably belongs in a shared
// module rather than being duplicated per song file — kept here only to
// match the given file's format exactly.
export const CRITERION_TO_LIMB = {
  leftElbow: ['leftArm'],
  leftShoulder: ['leftArm'],
  rightElbow: ['rightArm'],
  rightShoulder: ['rightArm'],
  wristGap: ['leftArm', 'rightArm'],
  leftKnee: ['leftLeg'],
  rightKnee: ['rightLeg'],
};

// ~30 seconds total, with breathing room between poses for transitions.
const TIMELINE = [
  { id: 'qi-shi-1', moveId: 'qi-shi', start: 1, end: 3 },
  { id: 'ma-bu-zha-gong-1', moveId: 'ma-bu-zha-gong', start: 3, end: 5.5 },
  { id: 'cai-qing-right-1', moveId: 'cai-qing-right', start: 5.5, end: 8 },
  { id: 'zhua-yang-1', moveId: 'zhua-yang', start: 8, end: 10.5 },
  { id: 'yao-tou-huang-nao-1', moveId: 'yao-tou-huang-nao', start: 10.5, end: 13 },
  { id: 'gao-zhuang-wang-qing-1', moveId: 'gao-zhuang-wang-qing', start: 13, end: 15.5 },
  { id: 'da-gun-1', moveId: 'da-gun', start: 15.5, end: 18 },
  { id: 'bai-san-bai-1', moveId: 'bai-san-bai', start: 18, end: 20.5 },
  { id: 'shizi-hui-shou-1', moveId: 'shizi-hui-shou', start: 20.5, end: 23 },
  { id: 'dun-fu-dai-yue-1', moveId: 'dun-fu-dai-yue', start: 23, end: 25.5 },
  { id: 'teng-yue-cai-qing-1', moveId: 'teng-yue-cai-qing', start: 25.5, end: 28 },
  { id: 'zhi-li-ang-shou-1', moveId: 'zhi-li-ang-shou', start: 28, end: 30.5 },
];

export default {
  id: 'singapore-lion-dance',
  title: '舞狮 - Lion Dance',
  audioSrc,
  timeline: TIMELINE,
  moves: DANCE_MOVES,
};
