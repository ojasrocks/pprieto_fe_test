import Image from 'next/image'

export default function NoResult() {
    const image = '/noResult.png'

    return (
        <Image src={image} width={`498px`} height={`552px`}/>
    )
}