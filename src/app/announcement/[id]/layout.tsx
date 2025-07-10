import ClientLayout from '@/page/announcement/model/idContext';

const AnnouncementByIdPage = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return <ClientLayout id={id}>{children}</ClientLayout>;
};
export default AnnouncementByIdPage;
