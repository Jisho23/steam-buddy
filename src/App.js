import React, { Component } from "react";
import {
  Button,
  Header,
  Form,
  Segment,
  Container,
  Icon,
  Grid,
  Card,
  Image
} from "semantic-ui-react";
import "./App.css";

// test with these ID: 76561197963372904 76561197981718236

class App extends Component {
  constructor() {
    super();
    this.state = {
      user1: { id: "", library: [] },
      user2: { id: "", library: [] },
      commonGames: "",
      mostPlayed: {}
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: {
        id: e.target.value,
        library: this.state[e.target.name].library
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const url1 = `http://localhost:4000/steam/user/${this.state.user1
      .id}/games`;
    const url2 = `http://localhost:4000/steam/user/${this.state.user2
      .id}/games`;
    const urls = [url1, url2];
    Promise.all(urls.map(url => fetch(url).then(resp => resp.json())))
      .then(userGames => {
        this.setState({
          user1: {
            id: this.state.user1.id,
            library: userGames[0].response.games
          },
          user2: {
            id: this.state.user2.id,
            library: userGames[1].response.games
          }
        });
      })
      .then(() => this.findCommonGames());
  };

  findCommonGames = () => {
    let user1GameIds = this.state.user1.library;
    let user2GameIds = this.state.user2.library.map(game => game.appid);
    let filteredIds = user1GameIds.filter(game =>
      user2GameIds.includes(game.appid)
    );
    this.setState({ commonGames: filteredIds });
    this.fetchGameInfo(filteredIds);
  };

  fetchGameInfo = gameIds => {
    gameIds = gameIds.sort(function(game1, game2) {
      return game2.playtime_forever - game1.playtime_forever;
    });
    console.log(gameIds);
    fetch(`http://localhost:4000/steam/game/${gameIds[0].appid}`)
      .then(res => res.json())
      .then(json => this.setState({ mostPlayed: json[gameIds[0].appid] }));
  };

  render() {
    return (
      <div>
        <Segment inverted>
          <Container>
            <Header inverted textAlign={"center"}>
              <h1 className="App-title">
                <Icon loading color="white" name="steam square" />Steam Buddy
              </h1>
              <h3>How compatible is your library to another users'?</h3>
            </Header>
          </Container>
        </Segment>
        <Container>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                      <Form.Input
                        label="Your SteamId"
                        name="user1"
                        placeholder="#"
                        onChange={this.handleChange}
                      />
                      <Form.Input
                        label={`Someone Else's Id`}
                        name="user2"
                        placeholder="#"
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Button color="black" type="submit">
                      Test your friendship!
                    </Button>
                  </Form>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                {this.state.commonGames !== "" ? (
                  <div>
                    <Segment>
                      {" "}
                      You have {this.state.commonGames.length} games in common!{" "}
                    </Segment>
                    {this.state.mostPlayed.data ? (
                      <Segment>
                        <p>Your best matches (by total game time)...</p>
                        <Card>
                          <Image
                            src={this.state.mostPlayed.data.header_image}
                          />
                          <Card.Header>
                            {this.state.mostPlayed.data.name}
                          </Card.Header>
                        </Card>
                      </Segment>
                    ) : null}
                  </div>
                ) : null}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;

// REMEMBER PROMISE.ALL([url, url])
