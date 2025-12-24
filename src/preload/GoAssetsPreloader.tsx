import { preload } from 'react-dom';
import { SoundProvider } from 'react-sounds';

import placeStoneSound from '@/assets/go/sound/place_stone.mp3';
import placeStoneAndCaptureLargeSound from '@/assets/go/sound/place_stone_and_capture_large.mp3';
import placeStoneAndCaptureMediumSound from '@/assets/go/sound/place_stone_and_capture_medium.mp3';
import placeStoneAndCaptureSmallSound from '@/assets/go/sound/place_stone_and_capture_small.mp3';

export default function GoAssetsPreloader({ children }: { children: React.ReactNode }) {
  preload('/src/assets/go/board.jpg', { as: 'image' });

  return (
    <SoundProvider
      preload={[
        placeStoneSound,
        placeStoneAndCaptureLargeSound,
        placeStoneAndCaptureMediumSound,
        placeStoneAndCaptureSmallSound,
      ]}
      initialEnabled={true}
    >
      {children}
    </SoundProvider>
  );
}
