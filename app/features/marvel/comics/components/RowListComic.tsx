import { Card, H5 } from 'tamagui';

type Props = {
  comicName: any;
};

export const RowListComic = ({ comicName }: Props) => {
  return (
      <Card elevate padding='$3' margin='$1.5'>
        <H5>{comicName}</H5>
      </Card>
  );
}
