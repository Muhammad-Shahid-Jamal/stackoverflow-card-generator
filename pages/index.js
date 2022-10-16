import Head from 'next/head'
import React from 'react'

const fetchProfileDetails = async () => {
  const response = await fetch('https://api.stackexchange.com/2.3/users/2541634?order=desc&sort=reputation&site=stackoverflow');
  return response.json();
}

export async function getServerSideProps() {
  const response = await fetchProfileDetails();
  const profileDetails = response.items[0];
  return {
    props: {
      profileDetails
    },
  }
}

export default function Home({ profileDetails }) {
  const [profileId, setProfileId] = React.useState(false);
  return (
    <div>
      <Head>
        <title>Stackoverflow Card Generator</title>
        <meta name="description" content="Stackoverflow Card Generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto flex flex-col items-center justify-center my-10">
        <h1 className="my-10 font-semibold text-4xl">Stackoverflow Card generator</h1>
        <section className="bg-gray-200 p-5 w-60 rounded-md text-center" >
          <img className="w-7" src="./stack-overflow.png" alt="StackOverflow" />
          <img src={profileDetails.profile_image} alt="User Profile" className="w-28 mx-auto rounded-full" />
          <div className="mt-4 font-bold text-xl">{profileDetails.display_name}</div>
          <div className="w-28 h-[1px] mt-2 bg-gray-300 mx-auto"></div>
          <div>
            <div className="text-3xl mt-2 text-yellow-600">{profileDetails.reputation}</div>
            <div className="text-xs mt-1 text-gray-600">StackOverflow Reputation</div>
          </div>
          <div className="w-28 mt-2 h-[1px] bg-gray-300 mx-auto"></div>
          <div>
            <div className="text-xs mt-2 text-gray-600">Badges</div>
            <div className="flex justify-center gap-5 mt-3">
              <div>
                <div className="w-3 h-3 mx-auto rounded-full bg-yellow-500 mb-1" />
                <div>{profileDetails.badge_counts.gold}</div>
              </div>
              <div>
                <div className="w-3 h-3 mx-auto rounded-full bg-gray-500 mb-1" />
                <div>{profileDetails.badge_counts.silver}</div>
              </div>
              <div>
                <div className="w-3 h-3 mx-auto rounded-full bg-yellow-700 mb-1" />
                <div>{profileDetails.badge_counts.bronze}</div>
              </div>
            </div>
          </div>
        </section>
        <section className="my-10">
          <div>
            <h1 className="mb-3 font-semibold text-xl text-center">Generate your&apos;s here:</h1>
            <label className="text-sm mt-1 text-gray-600" htmlFor="stackoverflow_id">StackOverflow ID: </label>
            <input onChange={(e) => setProfileId(e.target.value)} value={profileId ? profileId : ''} id="stackoverflow_id" className="border-2 rounded-md px-2" type="text" />
            <div className="text-center my-3">
              <input onClick={() => window.location.href = `/${profileId}`} className="py-2 px-4 rounded-md bg-blue-500 text-white font-extrabold border-2 cursor-pointer" value="Generate" type="button" />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
