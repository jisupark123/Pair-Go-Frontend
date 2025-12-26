import { FriendItem } from '@/components/organisms/Navigation/FriendsMenu/components/FriendItem';
import { EmptyState, SectionHeader } from '@/components/organisms/Navigation/FriendsMenu/components/shared';
import { MOCK_FRIENDS } from '@/components/organisms/Navigation/FriendsMenu/constants';

export function FriendList() {
  if (MOCK_FRIENDS.length === 0) {
    return <EmptyState message='친구가 없습니다.' />;
  }

  const onlineFriends = MOCK_FRIENDS.filter((f) => f.isOnline);
  const offlineFriends = MOCK_FRIENDS.filter((f) => !f.isOnline);

  return (
    <div className='flex flex-col gap-1'>
      {onlineFriends.length > 0 && (
        <>
          <SectionHeader title={`온라인 (${onlineFriends.length})`} />
          {onlineFriends.map((friend) => (
            <FriendItem key={friend.id} friend={friend} />
          ))}
        </>
      )}
      {offlineFriends.length > 0 && (
        <>
          <SectionHeader title='오프라인' className='mt-3' />
          {offlineFriends.map((friend) => (
            <FriendItem key={friend.id} friend={friend} />
          ))}
        </>
      )}
    </div>
  );
}
