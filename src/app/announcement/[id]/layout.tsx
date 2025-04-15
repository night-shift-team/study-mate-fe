import ClientAnnouncementDetail from './page';

const AnnouncementByIdPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  console.log(id);

  return <ClientAnnouncementDetail id={id} />;
};
export default AnnouncementByIdPage;
