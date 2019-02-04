import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text
} from "native-base";
import axios from "axios";
import { View } from "react-native";

export default class App extends Component {
  state = {
    ime: "",
    prezime: "",
    broj: "",
    kontakti: []
  };

  spremiKontakt = () => {
    const { ime, prezime, broj } = this.state;
    const url = `http://localhost:4000/spremi?ime=${ime}&prezime=${prezime}&broj=${broj}`;
    axios
      .put(url)
      .then(res => {
        console.log("res", res.data);
      })
      .catch(error => console.log(error));
  };

  dohvatiKontakte = () => {
    axios
      .get("http://localhost:4000/dohvati")
      .then(res => {
        this.setState({ kontakti: res.data });
        console.log("res", res.data);
      })
      .catch(error => console.log(error));
  };
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Ime: </Label>
              <Input
                onChangeText={text => this.setState({ ime: text })}
                name="ime"
                value={this.state.ime}
              />
            </Item>
            <Item stackedLabel last>
              <Label>Prezime: </Label>
              <Input
                onChangeText={text => this.setState({ prezime: text })}
                name="prezime"
                value={this.state.prezime}
              />
            </Item>
            <Item stackedLabel>
              <Label>Broj: </Label>
              <Input
                onChangeText={text => this.setState({ broj: text })}
                name="broj"
                value={this.state.broj}
              />
            </Item>
            <Button success block onPress={() => this.spremiKontakt()}>
              <Text>Posalji</Text>
            </Button>
          </Form>
          <Button danger block onPress={() => this.dohvatiKontakte()}>
            <Text>Dohvati</Text>
          </Button>
          {this.state.kontakti && (
            <View>
              {this.state.kontakti.map(kontakt => (
                <Text>{`Ime:${kontakt.ime}, Prezime: ${kontakt.prezime}, Mob: ${
                  kontakt.broj
                } `}</Text>
              ))}
            </View>
          )}
        </Content>
      </Container>
    );
  }
}
