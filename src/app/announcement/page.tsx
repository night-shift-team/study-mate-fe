import AnnouncementPage from '@/page/announcement/ui';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';
import { pageMetadata } from '@/pageMetadata';

export const metadata = pageMetadata.announcement;
const Announcement = () => {
  return (
    <PageAnimationWrapper>
      <AnnouncementPage />
    </PageAnimationWrapper>
  );
};
export default Announcement;
