import { Navigation } from '@/components/organisms/Navigation/Navigation';
import { NavigationBack } from '@/components/organisms/Navigation/NavigationBack';

export default function NewRoom() {
  return (
    <div className='pt-[80px] flex-1'>
      <Navigation left={<NavigationBack />} title='방 만들기' />
      방만들기
    </div>
  );
}
