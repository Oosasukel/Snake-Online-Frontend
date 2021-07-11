import Button from 'components/Button';
import Chat from 'components/Chat';
import Input from 'components/Input';
import SnakeAvatar from 'components/SnakeAvatar';
import * as S from './styles';

const Home = () => {
  return (
    <S.Container>
      <S.ReturnIcon src="/icons/return.svg" />

      <S.SectionPlayer>
        <S.PlayerInfo>
          <span>Oosasukel</span>
          <SnakeAvatar />
        </S.PlayerInfo>
        <Chat />
      </S.SectionPlayer>
      <S.SectionRooms>
        <S.RoomsContainer>
          <S.RoomsHeader>
            <span>Room Name</span>
            <span>Players</span>
          </S.RoomsHeader>
          <S.RoomsList>
            <S.ListItem>
              <span>Sala do Rodrigo</span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem>
              <span>
                Sala do Rodrigo Sala do Rodrigo Sala do Rodrigo Sala do Rodrigo
                Sala do Rodrigo Sala do Rodrigo
              </span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem>
              <span>Sala do Rodrigo</span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem disabled>
              <span>Sala do Rodrigo</span>
              <span>8/8</span>
            </S.ListItem>
            <S.ListItem disabled>
              <span>Sala do Rodrigo</span>
              <span>8/8</span>
            </S.ListItem>
            <S.ListItem disabled>
              <span>Sala do Rodrigo</span>
              <span>8/8</span>
            </S.ListItem>
            <S.ListItem>
              <span>Sala do Rodrigo</span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem>
              <span>Sala do Rodrigo</span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem>
              <span>Sala do Rodrigo</span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem>
              <span>Sala do Rodrigo</span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem>
              <span>Sala do Rodrigo</span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem>
              <span>Sala do Rodrigo</span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem>
              <span>Sala do Rodrigo</span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem>
              <span>Sala do Rodrigo</span>
              <span>6/8</span>
            </S.ListItem>
          </S.RoomsList>
        </S.RoomsContainer>
        <S.RoomsOptions>
          <form>
            <Input placeholder="Type to search rooms..." />
            <button type="submit">
              <S.SearchIcon src="/icons/search.svg" />
            </button>
          </form>

          <Button>New Room</Button>
        </S.RoomsOptions>
      </S.SectionRooms>
    </S.Container>
  );
};

export default Home;
