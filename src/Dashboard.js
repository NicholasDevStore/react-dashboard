import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Card, CardHeader, Avatar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ReactApexChart from "react-apexcharts";
import { metrics } from "./data/metrics";
import { leaderboards } from "./data/leaderboard";
import USAMap from "react-usa-map";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: "#FFF",
    boxShadow: "0px 0px 10px 0px #d2d2d2",
    borderRadius: 5,
  },
  metricCard: {
    color: theme.palette.text.secondary,
  },
  metricTitle: {
    fontSize: "1rem",
    color: "#000",
  },
  metricSubHeader: {
    fontSize: "0.5rem",
    color: "#ADADAD",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  chart: {
    padding: 20,
  },
  leaderboard: {
    display: "flex",
    flexDirection: "column",
    padding: "0 20px",
    height: "100%",
  },
  leaderBoardTitle: {
    fontSize: "1rem",
    margin: "20px 0px",
  },
  board: {
    display: "flex",
    margin: "9px 0px",
    alignItems: "center",
  },
  avatar: {
    width: 30,
    height: 30,
  },
  boardName: {
    margin: "0px 10px",
    fontSize: "0.75rem",
    marginRight: "auto",
  },
  boardValue: {
    margin: "0px 10px",
    fontSize: "0.75rem",
  },
  map: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
  },
  mapDescription: {
    color: "#373a3f",
    fontSize: "0.8175rem",
    marginBottom: 20,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [options] = useState({
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    stroke: {
      width: 2,
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2019-07-01",
        "2019-08-01",
        "2019-09-01",
        "2019-10-01",
        "2019-11-01",
        "2019-12-01",
        "2020-01-01",
        "2020-02-01",
        "2020-03-01",
        "2020-04-01",
        "2020-05-01",
        "2020-06-01",
      ],
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        return (
          '<div class="arrow_box">' +
          "<span>" +
          series[seriesIndex][dataPointIndex] +
          "</span>" +
          "</div>"
        );
      },
    },
    grid: {
      borderColor: "#111",
      strokeDashArray: 10,
    },
  });

  const [series] = useState([
    {
      name: "Users",
      data: [200, 300, 400, 270, 290, 600, 150, 350, 550, 430, 330, 670],
    },
  ]);

  const colors = ["red", "blue", "yellow", "pink", "green", "cyan"];
  const [optionsAge] = useState({
    chart: {
      height: 350,
      type: "bar",
      events: {
        click: function (chart, w, e) {
          // console.log(chart, w, e)
        },
      },
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: ["<20", "30", "40", "50", "60", ">70"],
      labels: {
        style: {
          colors: colors,
          fontSize: "0.75rem",
        },
      },
    },
  });

  const [seriesAge] = useState([
    {
      data: [21, 22, 10, 28, 16, 21],
    },
  ]);
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {metrics.map((metric) => (
            <Grid key={metric.id} item xs={3}>
              <Card className={`${classes.card} ${classes.metricCard}`}>
                <CardHeader
                  avatar={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={metric.value}
                  subheader={metric.name}
                  classes={{
                    title: classes.metricTitle,
                    subheader: classes.metricSubHeader,
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <div className={`${classes.card} ${classes.chart}`}>
              <ReactApexChart
                options={options}
                series={series}
                type="area"
                height={350}
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className={`${classes.card} ${classes.leaderboard}`}>
              <div className={classes.leaderBoardTitle}>Leaderboard</div>
              {leaderboards.map((board) => (
                <div className={classes.board} key={board.id}>
                  <Avatar
                    alt={board.name}
                    src="/80.jpg"
                    className={classes.avatar}
                  />
                  <div className={classes.boardName}>{board.name}</div>
                  {board.dropped ? (
                    <ArrowDropDownIcon color="secondary" />
                  ) : (
                    <ArrowDropUpIcon style={{ color: "green" }} />
                  )}
                  <div className={classes.boardValue}>{board.score}</div>
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <div className={`${classes.card} ${classes.map}`}>
              <div className={classes.mapDescription}>
                Users from{" "}
                <span style={{ color: "#6580ff" }}>United States</span>
              </div>
              <USAMap width="100%" height={260} />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={`${classes.card} ${classes.chart}`}>
              <div>Age</div>
              <div>Average 40+</div>
              <ReactApexChart
                options={optionsAge}
                series={seriesAge}
                type="bar"
                height={350}
              />
            </div>
          </Grid>
          <Grid item xs={1}>
            <div className={`${classes.card}`}>
              <div>Gender</div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
