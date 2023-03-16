import React, { useState, useEffect, useRef } from 'react';

//statsCountry
export default function StatsCountry() {
  const [dataset, setData] = useState(null);
  const datas = useRef({});

  useEffect(() => {
    async function fetchData() {
      //host
      const response_host = await fetch("https://www.covidapiss.site/rapid_host/12vs@")
      const host_ = await response_host.json();

      //api
      const response_api = await fetch("https://www.covidapiss.site/rapid_api/12api@")
      const api_ = await response_api.json();

      //statistics
      const response_map = await fetch(`https://covid-193.p.rapidapi.com/statistics?country=india`, {
        headers: {
          'X-RapidAPI-Host': host_.rapid_host,
          'X-RapidAPI-Key': api_.rapid_api,
        },
      })
      const map_ = await response_map.json();

      //validation
      if (!map_ || !map_.response || !Array.isArray(map_.response) || map_.response.length === 0) {
        throw new Error("Invalid API response");
      }
      setData(map_);
      datas.current.population = map_["response"][0]["population"];
      datas.current.casesData = map_["response"][0]["cases"];
      datas.current.testData = map_["response"][0]["tests"];
      datas.current.timeData = JSON.stringify(map_["response"][0]["time"]);
     }

    fetchData();
  }, []);
  return (
    <div className='stats' id='stats' style={{ margin: "1%" }}>
      {dataset ?
        <><div className='slider'>
          <h4>India Covid Report</h4>
          <h4>{datas.current.timeData.split("T")[0]}</h4>
          <h4>{datas.current.timeData.split("T")[1]}</h4>
        </div>
          <div id='masque' className='masque'>
            <p className='inner-masque'><strong>Population&nbsp;:&nbsp;</strong>{datas.current.population}</p>
            <p className='inner-masque'><strong>Active&nbsp;:&nbsp;</strong>{datas.current.casesData["active"] ? datas.current.casesData["active"] : 0}</p>
            <p className='inner-masque'><strong>Critcal&nbsp;:&nbsp;</strong>{datas.current.casesData["critical"] ? datas.current.casesData["critical"] : 0}</p>
            <p className='inner-masque'><strong>Recovered&nbsp;:&nbsp;</strong>{datas.current.casesData["recovered"] ? datas.current.casesData["recovered"] : 0}</p>
            <p className='inner-masque'><strong>Tests&nbsp;:&nbsp;</strong>{datas.current.testData ? datas.current.testData["total"] : 0}</p>
          </div>
        </> :
        <div style={{ backgroundColor: "white", padding: "1%", fontFamily: "cursive", fontWeight: "bold", fontSize: "1.5em" }}>Loading...</div>
      }
    </div>
  )
}