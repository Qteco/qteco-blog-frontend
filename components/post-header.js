import Avatar from "../components/avatar";
import Date from "../components/date";
import CoverImage from "../components/cover-image";
import PostTitle from "../components/post-title";

export default function PostHeader({ title, coverImage, date, author }) {
    return (
        <>
            <PostTitle>{title}</PostTitle>
            <div className='flex mb-12 items-center gap-5'>
                <Avatar name={author.name} picture={author.picture} />
            </div>
            <div className='mb-8 md:mb-16 sm:mx-0'>
                <CoverImage title={title} url={coverImage.url} width={coverImage.width} height={coverImage.height} />
            </div>
            <div className='max-w-prose mx-auto'>
                <div className='block md:hidden mb-6'>
                    <Avatar name={author.name} picture={author.picture} />
                </div>
                <div className='mb-6 text-lg font-bold'>
                    Geplaatst op <Date dateString={date} />
                </div>
            </div>
        </>
    );
}
