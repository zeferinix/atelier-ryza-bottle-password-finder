import { EnemyBossType } from '~/enums';

const passwordResultFragment = gql`
  fragment PasswordResultFragment on PasswordResult {
    password
    level
    cost
    primaryItem {
      name
    }
    secondaryItem {
      name
    }
    boss {
      name
      type
    }
    monster {
      name
    }
    mapName
  }
`;

export const findByItemNameQuery = gql`
  ${passwordResultFragment}

  query FindByItemName($input: String!, $levelLimit: Int) {
    itemName(input: $input, levelLimit: $levelLimit) {
      ...PasswordResultFragment
    }
  }
`;

export const findByPasswordQuery = gql`
  ${passwordResultFragment}

  query findByPassword($input: String!, $levelLimit: Int) {
    password(input: $input, levelLimit: $levelLimit) {
      ...PasswordResultFragment
    }
  }
`;

type PasswordResult = {
  password: string;
  level: number;
  cost: number;
  primaryItem: {
    name: string;
  };
  secondaryItem: {
    name: string;
  };
  boss: {
    name: string;
    type: EnemyBossType;
  };
  monster: {
    name: string;
  };
  mapName: string;
};

type PasswordResultInput = {
  input: string;
  levelLimit?: number;
};

export const useFindByItemNameGQL = (variables: Parameters<typeof useQuery<unknown, PasswordResultInput>>[1], enabled: Ref<boolean>) => {
  // NOTE: A small note but the query here doesn't react if `variables` is of type `Ref`. Seems to work fine with `reactive` though.
  return useQuery<{ itemName: PasswordResult[] }>(findByItemNameQuery, variables, () => ({ enabled: enabled.value }));
};

export const useFindByPasswordGQL = (variables: Parameters<typeof useQuery<unknown, PasswordResultInput>>[1], enabled: Ref<boolean>) => {
  return useQuery<{ password: PasswordResult[] }>(findByPasswordQuery, variables, () => ({ enabled: enabled.value }));
};
