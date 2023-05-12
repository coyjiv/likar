import { Container, Grid, SimpleGrid, Skeleton, useMantineTheme, rem } from '@mantine/core';

type Props = {}

const PRIMARY_COL_HEIGHT = rem(300);

const AppointmentsGrid = (props: Props) => {
    const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

  return (
    <Container my="md" maw={'100%'} px={0}>
      <SimpleGrid cols={2} px={0} spacing="md" w={'100%'} breakpoints={[{ maxWidth: 'full', cols: 1 }]}>
        <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
        <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
      </SimpleGrid>
    </Container>
  )
}

export default AppointmentsGrid