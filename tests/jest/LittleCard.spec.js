import renderer from 'react-test-renderer';
import LittleCard from '../../components/LittleCard';

it('changes the opacity of overlay when hovered', () => {
  const myMockFav = jest.fn();
  const myMockValue = jest.fn();

  myMockFav.mockReturnValueOnce(true).mockReturnValueOnce(false)
  myMockValue.mockReturnValueOnce({
    "Title": "The Trip to Italy",
    "Year": "2014",
    "imdbID": "tt2967006",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNTAxMDQzNzA3Nl5BMl5BanBnXkFtZTgwNzU4MDk4MTE@._V1_SX300.jpg"
}).mockReturnValueOnce({
    "Title": "My Voyage to Italy",
    "Year": "1999",
    "imdbID": "tt0173772",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMDRkM2RiZWYtODYxNy00ZmJlLTkyZDQtNDdiNTIwMzkxYzQ1XkEyXkFqcGdeQXVyMzIwNDY4NDI@._V1_SX300.jpg"
})
  for (let i = 0; i < 2; i++){
    const component = renderer.create(
    <LittleCard fav={myMockFav()} value={myMockValue()}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseEnter();
  });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseLeave();
  });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
}
});