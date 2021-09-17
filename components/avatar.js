import Image from "next/image";

export default function Avatar({ name, picture }) {
    const url = picture.url ?? picture[0].url;
    const imageUrl = `${url.startsWith("/") ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ""}${url}`;

    return (
        <div className='flex items-center'>
            <Image src={imageUrl} alt={name} className='w-12 h-12 rounded-full' width='48' height='48' />
            <div className='text-xl font-bold ml-4'>{name}</div>
        </div>
    );
}
