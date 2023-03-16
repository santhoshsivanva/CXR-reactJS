import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import './components.css';

const countriesList = [
  "Afghanistan",
  "Bangladesh",
  "Bhutan",
  "China",
  "Maldives",
  "Myanmar",
  "Nepal",
  "Pakistan",
  "Brunei",
  "Cambodia",
  "Indonesia",
  "India",
  "Malaysia",
  "Philippines",
  "Singapore",
  "Thailand",
  "Vietnam",
];

const Nhart = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const responseHost = await fetch("https://www.covidapiss.site/rapid_host/12vs@");
      const host = await responseHost.json();

      const responseApi = await fetch("https://www.covidapiss.site/rapid_api/12api@");
      const api = await responseApi.json();

      //updated by chartGPT 
      const responses = await Promise.all(countriesList.map(async (country) => {
        const responseMap = await fetch(`https://covid-193.p.rapidapi.com/statistics?country=${country}`, {
          headers: {
            'X-RapidAPI-Host': host.rapid_host,
            'X-RapidAPI-Key': api.rapid_api,
          },
        });

        const map = await responseMap.json();

        return {
          country,
          totalCases: map["response"][0]["cases"]["total"],
          recoveredCases: map["response"][0]["cases"]["recovered"],
          deathCases: map["response"][0]["deaths"]["total"],
        };
      }));

      const totalCases = responses.map((response) => response.totalCases);
      const recoveredCases = responses.map((response) => response.recoveredCases);
      const deathCases = responses.map((response) => response.deathCases);

      setData({
        labels: countriesList,
        datasets: [
          {
            label: 'Total Affected',
            data: totalCases,
            backgroundColor: '#f1c40f',
            borderColor: 'black',
            borderWidth: 2
          },
          {
            label: 'Total Recovered',
            data: recoveredCases,
            backgroundColor: 'green',
            borderColor: 'black',
            borderWidth: 2,
          },
          {
            label: 'Total Deaths',
            data: deathCases,
            backgroundColor: 'red',
            borderColor: 'black',
            borderWidth: 2,
          }
        ]
      });
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      new Chart(document.getElementById("mycanvas"), {
        type: 'bar',
        data: data,
        options: {
          plugins: {
            legend: {
              display: true,
              labels: {
                color: 'black'
              }
            }
          },
          scales: {
            x: {
              ticks: {
                color: 'black'
              }
            },
            y: {
              ticks: {
                color: 'black'
              },
              beginAtZero: true
            }
          }
        }
      });
      new Chart(document.getElementById("mycanvas2"), {
        type: 'line',
        data: data,
        options: {
          plugins: {
            legend: {
              display: true,
              labels: {
                color: '#F0FFFF'
              }
            }
          },
          scales: {
            x: {
              ticks: {
                color: '#F0FFFF'
              }
            },
            y: {
              ticks: {
                color: '#F0FFFF'
              },
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [loading, data]);

  return (
    <div className="main">
      {loading ? (
        <div className="article">
          <div className="articleRight">
            <div style={{ backgroundColor: "white", padding: "1%", fontFamily: "cursive", fontWeight: "bold", fontSize: "1.5em" }}>Loading...</div>
          </div>
          <div className="articleRight">
            <div style={{ backgroundColor: "white", padding: "1%", fontFamily: "cursive", fontWeight: "bold", fontSize: "1.5em" }}>Loading...</div>
          </div>
        </div>
      ) : (
        <div className="article">
          <div className="articleleft">
            <canvas id="mycanvas"></canvas>
          </div>
          <div className="articleRight">
            <canvas id="mycanvas2"></canvas>
          </div>
        </div>
      )}
    </div>
  );
}



export default Nhart;
