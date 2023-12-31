## Proof of Concept

This markdown file contains the POC values used in testing

### Create Leaves

1. 0x52469E13ac6DdbFbf803F48E7106f8294E2B888f

2. 4283020
3. 4283030
4. 6

Output:

1. [
   [
   '0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E',
   '0x52469E13ac6DdbFbf803F48E7106f8294E2B888f',
   '0',
   '4283030'
   ],
   [
   '0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E',
   '0x52469E13ac6DdbFbf803F48E7106f8294E2B888f',
   '1',
   '4283024'
   ],
   [
   '0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E',
   '0x52469E13ac6DdbFbf803F48E7106f8294E2B888f',
   '2',
   '4283030'
   ],
   [
   '0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E',
   '0x52469E13ac6DdbFbf803F48E7106f8294E2B888f',
   '3',
   '4283030'
   ]
   ]

### Create Merkle

Input:

1. [ [ "0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E", "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f", "0", "4283030" ], [ "0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E", "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f", "1", "4283024" ], [ "0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E", "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f", "2", "4283030" ], [ "0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E", "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f", "3", "4283030" ], [ "0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E", "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f", "4", "4283030" ], [ "0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E", "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f", "5", "4283030" ] ]

2. address,address,uint256,uint256

Output:

1. Root - 0xd16a3b414e020926d93561705a61fc7b8f19c443c2cce37795d554aab5a5a830 and 0xebd0338c2091ebb3e5aaab17c9c880689563fe74580addc55a1291d0abad6199 and 0xba4620c19fd0644777bbd8bc20ded805db490e686748c556338410592557d688
2. Merkle Tree - {
   "tree": [
   {
   "0": 235,
   "1": 208,
   "2": 51,
   "3": 140,
   "4": 32,
   "5": 145,
   "6": 235,
   "7": 179,
   "8": 229,
   "9": 170,
   "10": 171,
   "11": 23,
   "12": 201,
   "13": 200,
   "14": 128,
   "15": 104,
   "16": 149,
   "17": 99,
   "18": 254,
   "19": 116,
   "20": 88,
   "21": 10,
   "22": 221,
   "23": 197,
   "24": 90,
   "25": 18,
   "26": 145,
   "27": 208,
   "28": 171,
   "29": 173,
   "30": 97,
   "31": 153
   },
   {
   "0": 42,
   "1": 143,
   "2": 186,
   "3": 198,
   "4": 21,
   "5": 130,
   "6": 56,
   "7": 125,
   "8": 183,
   "9": 129,
   "10": 176,
   "11": 74,
   "12": 185,
   "13": 84,
   "14": 148,
   "15": 239,
   "16": 12,
   "17": 16,
   "18": 250,
   "19": 47,
   "20": 70,
   "21": 58,
   "22": 36,
   "23": 199,
   "24": 191,
   "25": 207,
   "26": 138,
   "27": 21,
   "28": 50,
   "29": 218,
   "30": 47,
   "31": 45
   },
   {
   "0": 99,
   "1": 60,
   "2": 12,
   "3": 105,
   "4": 21,
   "5": 252,
   "6": 219,
   "7": 46,
   "8": 243,
   "9": 223,
   "10": 88,
   "11": 151,
   "12": 113,
   "13": 219,
   "14": 167,
   "15": 27,
   "16": 19,
   "17": 173,
   "18": 217,
   "19": 83,
   "20": 147,
   "21": 103,
   "22": 131,
   "23": 160,
   "24": 45,
   "25": 107,
   "26": 168,
   "27": 32,
   "28": 177,
   "29": 2,
   "30": 138,
   "31": 32
   },
   {
   "0": 250,
   "1": 218,
   "2": 53,
   "3": 247,
   "4": 175,
   "5": 248,
   "6": 150,
   "7": 13,
   "8": 193,
   "9": 58,
   "10": 107,
   "11": 115,
   "12": 200,
   "13": 216,
   "14": 192,
   "15": 39,
   "16": 24,
   "17": 235,
   "18": 64,
   "19": 86,
   "20": 102,
   "21": 217,
   "22": 195,
   "23": 255,
   "24": 176,
   "25": 164,
   "26": 250,
   "27": 70,
   "28": 179,
   "29": 6,
   "30": 120,
   "31": 137
   },
   {
   "0": 231,
   "1": 203,
   "2": 188,
   "3": 183,
   "4": 80,
   "5": 234,
   "6": 87,
   "7": 27,
   "8": 56,
   "9": 90,
   "10": 231,
   "11": 213,
   "12": 167,
   "13": 178,
   "14": 151,
   "15": 115,
   "16": 77,
   "17": 10,
   "18": 102,
   "19": 107,
   "20": 233,
   "21": 145,
   "22": 7,
   "23": 139,
   "24": 38,
   "25": 215,
   "26": 199,
   "27": 99,
   "28": 172,
   "29": 26,
   "30": 4,
   "31": 209
   },
   {
   "0": 147,
   "1": 83,
   "2": 104,
   "3": 28,
   "4": 68,
   "5": 59,
   "6": 47,
   "7": 4,
   "8": 113,
   "9": 78,
   "10": 51,
   "11": 244,
   "12": 191,
   "13": 229,
   "14": 52,
   "15": 134,
   "16": 223,
   "17": 178,
   "18": 64,
   "19": 73,
   "20": 113,
   "21": 13,
   "22": 33,
   "23": 27,
   "24": 165,
   "25": 166,
   "26": 209,
   "27": 217,
   "28": 23,
   "29": 128,
   "30": 170,
   "31": 67
   },
   {
   "0": 98,
   "1": 48,
   "2": 199,
   "3": 222,
   "4": 235,
   "5": 162,
   "6": 225,
   "7": 84,
   "8": 178,
   "9": 200,
   "10": 80,
   "11": 74,
   "12": 156,
   "13": 47,
   "14": 98,
   "15": 60,
   "16": 167,
   "17": 55,
   "18": 207,
   "19": 235,
   "20": 235,
   "21": 207,
   "22": 183,
   "23": 255,
   "24": 102,
   "25": 46,
   "26": 70,
   "27": 56,
   "28": 43,
   "29": 238,
   "30": 85,
   "31": 65
   },
   {
   "0": 86,
   "1": 207,
   "2": 127,
   "3": 214,
   "4": 200,
   "5": 88,
   "6": 119,
   "7": 122,
   "8": 154,
   "9": 13,
   "10": 251,
   "11": 41,
   "12": 244,
   "13": 188,
   "14": 10,
   "15": 87,
   "16": 36,
   "17": 41,
   "18": 111,
   "19": 5,
   "20": 71,
   "21": 10,
   "22": 47,
   "23": 37,
   "24": 119,
   "25": 227,
   "26": 195,
   "27": 140,
   "28": 168,
   "29": 143,
   "30": 137,
   "31": 100
   },
   {
   "0": 26,
   "1": 46,
   "2": 188,
   "3": 98,
   "4": 15,
   "5": 172,
   "6": 67,
   "7": 129,
   "8": 243,
   "9": 98,
   "10": 251,
   "11": 187,
   "12": 199,
   "13": 141,
   "14": 128,
   "15": 79,
   "16": 81,
   "17": 213,
   "18": 219,
   "19": 216,
   "20": 242,
   "21": 218,
   "22": 133,
   "23": 58,
   "24": 69,
   "25": 172,
   "26": 7,
   "27": 11,
   "28": 46,
   "29": 215,
   "30": 190,
   "31": 74
   }
   ],
   "values": [
   {
   "value": [
   "0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
   "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f",
   "0",
   "4283030"
   ],
   "treeIndex": 7
   },
   {
   "value": [
   "0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
   "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f",
   "1",
   "4283024"
   ],
   "treeIndex": 5
   },
   {
   "value": [
   "0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
   "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f",
   "2",
   "4283030"
   ],
   "treeIndex": 8
   },
   {
   "value": [
   "0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
   "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f",
   "3",
   "4283030"
   ],
   "treeIndex": 4
   },
   {
   "value": [
   "0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
   "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f",
   "4",
   "4283030"
   ],
   "treeIndex": 6
   }
   ],
   "leafEncoding": [
   "address",
   "address",
   "uint256",
   "uint256"
   ],
   "hashLookup": {
   "0x56cf7fd6c858777a9a0dfb29f4bc0a5724296f05470a2f2577e3c38ca88f8964": 0,
   "0x9353681c443b2f04714e33f4bfe53486dfb24049710d211ba5a6d1d91780aa43": 1,
   "0x1a2ebc620fac4381f362fbbbc78d804f51d5dbd8f2da853a45ac070b2ed7be4a": 2,
   "0xe7cbbcb750ea571b385ae7d5a7b297734d0a666be991078b26d7c763ac1a04d1": 3,
   "0x6230c7deeba2e154b2c8504a9c2f623ca737cfebebcfb7ff662e46382bee5541": 4
   }
   }

### Create Event

INPUT:

1. nftAddress - 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 localhost and sepolia
2. rewardToken - 0x0000000000000000000000000000000000000000
3. creator -
4. root - 0xd16a3b414e020926d93561705a61fc7b8f19c443c2cce37795d554aab5a5a830
5. blockStart -
6. blockEnd -
7. nfts -
8. totalHeld -

### Create proof

Output:

1. Proof - [
   {
   Value: [
   '0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E',
   '0x52469E13ac6DdbFbf803F48E7106f8294E2B888f',
   '0',
   '4283030'
   ],
   Proof: [
   '0x1a2ebc620fac4381f362fbbbc78d804f51d5dbd8f2da853a45ac070b2ed7be4a',
   '0x633c0c6915fcdb2ef3df589771dba71b13add953936783a02d6ba820b1028a20',
   '0x2799a5611c98a45789e2a7f0d456e3330fbe9801ed514f2086d0466b05c2f088'
   ]
   },
   {
   Value: [
   '0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E',
   '0x52469E13ac6DdbFbf803F48E7106f8294E2B888f',
   '1',
   '4283024'
   ],
   Proof: [
   '0x6230c7deeba2e154b2c8504a9c2f623ca737cfebebcfb7ff662e46382bee5541',
   '0xfada35f7aff8960dc13a6b73c8d8c02718eb405666d9c3ffb0a4fa46b3067889',
   '0x2799a5611c98a45789e2a7f0d456e3330fbe9801ed514f2086d0466b05c2f088'
   ]
   },
   {
   Value: [
   '0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E',
   '0x52469E13ac6DdbFbf803F48E7106f8294E2B888f',
   '2',
   '4283030'
   ],
   Proof: [
   '0x56cf7fd6c858777a9a0dfb29f4bc0a5724296f05470a2f2577e3c38ca88f8964',
   '0x633c0c6915fcdb2ef3df589771dba71b13add953936783a02d6ba820b1028a20',
   '0x2799a5611c98a45789e2a7f0d456e3330fbe9801ed514f2086d0466b05c2f088'
   ]
   },
   {
   Value: [
   '0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E',
   '0x52469E13ac6DdbFbf803F48E7106f8294E2B888f',
   '3',
   '4283030'
   ],
   Proof: [
   '0xb097c1f31b115805827f9caa2f47ed64eb2638d1eb42e501f3192dae965855ed',
   '0x0c509b2d9f0f763f3d2fd51f719a2b658c59e2ddf00403b4a17ab24fdec5082c'
   ]
   },
   {
   Value: [
   '0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E',
   '0x52469E13ac6DdbFbf803F48E7106f8294E2B888f',
   '4',
   '4283030'
   ],
   Proof: [
   '0x9353681c443b2f04714e33f4bfe53486dfb24049710d211ba5a6d1d91780aa43',
   '0xfada35f7aff8960dc13a6b73c8d8c02718eb405666d9c3ffb0a4fa46b3067889',
   '0x2799a5611c98a45789e2a7f0d456e3330fbe9801ed514f2086d0466b05c2f088'
   ]
   },
   {
   Value: [
   '0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E',
   '0x52469E13ac6DdbFbf803F48E7106f8294E2B888f',
   '5',
   '4283030'
   ],
   Proof: [
   '0xe7cbbcb750ea571b385ae7d5a7b297734d0a666be991078b26d7c763ac1a04d1',
   '0x0c509b2d9f0f763f3d2fd51f719a2b658c59e2ddf00403b4a17ab24fdec5082c'
   ]
   }
   ]

- first proof value: 0x1a2ebc620fac4381f362fbbbc78d804f51d5dbd8f2da853a45ac070b2ed7be4a,0x633c0c6915fcdb2ef3df589771dba71b13add953936783a02d6ba820b1028a20,0x2799a5611c98a45789e2a7f0d456e3330fbe9801ed514f2086d0466b05c2f088

- new proof value: [
  {
  "Value": [
  "0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
  "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f",
  "0",
  "4283030"
  ],
  "Proof": [
  "0x1a2ebc620fac4381f362fbbbc78d804f51d5dbd8f2da853a45ac070b2ed7be4a",
  "0x871af457624a20696dba818df1d459a89ad0dd002e7ebb93714e2fe15f34414c"
  ]
  },
  {
  "Value": [
  "0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
  "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f",
  "1",
  "4283024"
  ],
  "Proof": [
  "0xe7cbbcb750ea571b385ae7d5a7b297734d0a666be991078b26d7c763ac1a04d1",
  "0xfada35f7aff8960dc13a6b73c8d8c02718eb405666d9c3ffb0a4fa46b3067889"
  ]
  },
  {
  "Value": [
  "0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
  "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f",
  "2",
  "4283030"
  ],
  "Proof": [
  "0x56cf7fd6c858777a9a0dfb29f4bc0a5724296f05470a2f2577e3c38ca88f8964",
  "0x871af457624a20696dba818df1d459a89ad0dd002e7ebb93714e2fe15f34414c"
  ]
  },
  {
  "Value": [
  "0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
  "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f",
  "3",
  "4283030"
  ],
  "Proof": [
  "0x9353681c443b2f04714e33f4bfe53486dfb24049710d211ba5a6d1d91780aa43",
  "0xfada35f7aff8960dc13a6b73c8d8c02718eb405666d9c3ffb0a4fa46b3067889"
  ]
  }
  ]

- new first proof value: 0x1a2ebc620fac4381f362fbbbc78d804f51d5dbd8f2da853a45ac070b2ed7be4a,0x871af457624a20696dba818df1d459a89ad0dd002e7ebb93714e2fe15f34414c

### Hardhat network/Foundry anvil input

1. `yarn chain`
2. `yarn deploy`
3. ## `createLeaves` with

   - 0x5FbDB2315678afecb367f032d93F642f64180aa3
   - 2
   - 4
   - 4

   OUTPUT:
   leaves - [
   [
   "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
   "0x5FbDB2315678afecb367f032d93F642f64180aa3",
   "0",
   "4"
   ],
   [
   "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
   "0x5FbDB2315678afecb367f032d93F642f64180aa3",
   "1",
   "4"
   ],
   [
   "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
   "0x5FbDB2315678afecb367f032d93F642f64180aa3",
   "2",
   "4"
   ],
   [
   "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
   "0x5FbDB2315678afecb367f032d93F642f64180aa3",
   "3",
   "4"
   ]
   ]

4. `createMerkle` with
   INPUT:

   - leaves object above ^
     OUTPUT:
     tree - {
     "tree": [
     {
     "0": 35,
     "1": 57,
     "2": 104,
     "3": 109,
     "4": 194,
     "5": 170,
     "6": 21,
     "7": 238,
     "8": 90,
     "9": 89,
     "10": 22,
     "11": 35,
     "12": 139,
     "13": 45,
     "14": 83,
     "15": 24,
     "16": 91,
     "17": 234,
     "18": 9,
     "19": 39,
     "20": 120,
     "21": 82,
     "22": 79,
     "23": 76,
     "24": 172,
     "25": 214,
     "26": 173,
     "27": 122,
     "28": 79,
     "29": 217,
     "30": 246,
     "31": 122
     },
     {
     "0": 190,
     "1": 92,
     "2": 39,
     "3": 204,
     "4": 92,
     "5": 227,
     "6": 250,
     "7": 155,
     "8": 34,
     "9": 88,
     "10": 235,
     "11": 79,
     "12": 123,
     "13": 186,
     "14": 179,
     "15": 193,
     "16": 133,
     "17": 210,
     "18": 65,
     "19": 199,
     "20": 108,
     "21": 154,
     "22": 207,
     "23": 203,
     "24": 195,
     "25": 71,
     "26": 75,
     "27": 54,
     "28": 118,
     "29": 97,
     "30": 114,
     "31": 218
     },
     {
     "0": 195,
     "1": 236,
     "2": 23,
     "3": 99,
     "4": 46,
     "5": 167,
     "6": 51,
     "7": 252,
     "8": 51,
     "9": 14,
     "10": 9,
     "11": 121,
     "12": 94,
     "13": 159,
     "14": 97,
     "15": 178,
     "16": 126,
     "17": 45,
     "18": 89,
     "19": 254,
     "20": 212,
     "21": 168,
     "22": 171,
     "23": 110,
     "24": 253,
     "25": 247,
     "26": 28,
     "27": 140,
     "28": 16,
     "29": 98,
     "30": 39,
     "31": 151
     },
     {
     "0": 251,
     "1": 214,
     "2": 188,
     "3": 210,
     "4": 59,
     "5": 229,
     "6": 189,
     "7": 146,
     "8": 113,
     "9": 26,
     "10": 58,
     "11": 172,
     "12": 174,
     "13": 69,
     "14": 212,
     "15": 205,
     "16": 171,
     "17": 245,
     "18": 7,
     "19": 220,
     "20": 55,
     "21": 57,
     "22": 70,
     "23": 144,
     "24": 40,
     "25": 32,
     "26": 34,
     "27": 238,
     "28": 225,
     "29": 4,
     "30": 8,
     "31": 130
     },
     {
     "0": 238,
     "1": 95,
     "2": 229,
     "3": 100,
     "4": 72,
     "5": 127,
     "6": 48,
     "7": 78,
     "8": 83,
     "9": 11,
     "10": 201,
     "11": 246,
     "12": 195,
     "13": 157,
     "14": 55,
     "15": 149,
     "16": 218,
     "17": 52,
     "18": 41,
     "19": 164,
     "20": 31,
     "21": 176,
     "22": 208,
     "23": 91,
     "24": 208,
     "25": 254,
     "26": 49,
     "27": 80,
     "28": 85,
     "29": 248,
     "30": 106,
     "31": 49
     },
     {
     "0": 209,
     "1": 236,
     "2": 61,
     "3": 233,
     "4": 56,
     "5": 110,
     "6": 105,
     "7": 0,
     "8": 13,
     "9": 146,
     "10": 19,
     "11": 144,
     "12": 124,
     "13": 52,
     "14": 63,
     "15": 197,
     "16": 73,
     "17": 144,
     "18": 54,
     "19": 147,
     "20": 115,
     "21": 41,
     "22": 229,
     "23": 13,
     "24": 86,
     "25": 3,
     "26": 93,
     "27": 0,
     "28": 76,
     "29": 137,
     "30": 139,
     "31": 10
     },
     {
     "0": 1,
     "1": 196,
     "2": 163,
     "3": 148,
     "4": 192,
     "5": 25,
     "6": 233,
     "7": 161,
     "8": 184,
     "9": 148,
     "10": 126,
     "11": 229,
     "12": 227,
     "13": 247,
     "14": 155,
     "15": 59,
     "16": 225,
     "17": 83,
     "18": 64,
     "19": 32,
     "20": 251,
     "21": 61,
     "22": 182,
     "23": 245,
     "24": 12,
     "25": 37,
     "26": 102,
     "27": 144,
     "28": 193,
     "29": 148,
     "30": 53,
     "31": 227
     }
     ],
     "values": [
     {
     "value": [
     "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
     "0x5FbDB2315678afecb367f032d93F642f64180aa3",
     "0",
     "4"
     ],
     "treeIndex": 6
     },
     {
     "value": [
     "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
     "0x5FbDB2315678afecb367f032d93F642f64180aa3",
     "1",
     "4"
     ],
     "treeIndex": 5
     },
     {
     "value": [
     "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
     "0x5FbDB2315678afecb367f032d93F642f64180aa3",
     "2",
     "4"
     ],
     "treeIndex": 3
     },
     {
     "value": [
     "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
     "0x5FbDB2315678afecb367f032d93F642f64180aa3",
     "3",
     "4"
     ],
     "treeIndex": 4
     }
     ],
     "leafEncoding": [
     "address",
     "address",
     "uint256",
     "uint256"
     ],
     "hashLookup": {
     "0x01c4a394c019e9a1b8947ee5e3f79b3be1534020fb3db6f50c256690c19435e3": 0,
     "0xd1ec3de9386e69000d9213907c343fc5499036937329e50d56035d004c898b0a": 1,
     "0xfbd6bcd23be5bd92711a3aacae45d4cdabf507dc37394690282022eee1040882": 2,
     "0xee5fe564487f304e530bc9f6c39d3795da3429a41fb0d05bd0fe315055f86a31": 3
     }
     }
     root - 0x2339686dc2aa15ee5a5916238b2d53185bea092778524f4cacd6ad7a4fd9f67a

5. `createEvent` with

   - input 1
   - root - 0x2339686dc2aa15ee5a5916238b2d53185bea092778524f4cacd6ad7a4fd9f67a
     OUTPUT:
     id - 0
     hash - 0x13ba086347eff3679865bb0f85cbd7a76f3e81ad8fb4082d8e3c7be71e2aadf6

6. `createProof` with
   - input
   - input

OUTPUT:

- proof - [
  {
  "Value": [
  "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
  "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  "0",
  "4"
  ],
  "Proof": [
  "0xd1ec3de9386e69000d9213907c343fc5499036937329e50d56035d004c898b0a",
  "0xbe5c27cc5ce3fa9b2258eb4f7bbab3c185d241c76c9acfcbc3474b36766172da"
  ]
  },
  {
  "Value": [
  "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
  "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  "1",
  "4"
  ],
  "Proof": [
  "0x01c4a394c019e9a1b8947ee5e3f79b3be1534020fb3db6f50c256690c19435e3",
  "0xbe5c27cc5ce3fa9b2258eb4f7bbab3c185d241c76c9acfcbc3474b36766172da"
  ]
  },
  {
  "Value": [
  "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
  "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  "2",
  "4"
  ],
  "Proof": [
  "0xee5fe564487f304e530bc9f6c39d3795da3429a41fb0d05bd0fe315055f86a31",
  "0xc3ec17632ea733fc330e09795e9f61b27e2d59fed4a8ab6efdf71c8c10622797"
  ]
  },
  {
  "Value": [
  "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
  "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  "3",
  "4"
  ],
  "Proof": [
  "0xfbd6bcd23be5bd92711a3aacae45d4cdabf507dc37394690282022eee1040882",
  "0xc3ec17632ea733fc330e09795e9f61b27e2d59fed4a8ab6efdf71c8c10622797"
  ]
  }
  ]

(first proof object for frontend testing since `createProof` can't handle whitespaces or quotation marks yet:
0xd1ec3de9386e69000d9213907c343fc5499036937329e50d56035d004c898b0a,0xbe5c27cc5ce3fa9b2258eb4f7bbab3c185d241c76c9acfcbc3474b36766172da
)

7. `createClaim` with

- proof - [
  "0xd1ec3de9386e69000d9213907c343fc5499036937329e50d56035d004c898b0a", //0xd1ec3de9386e69000d9213907c343fc5499036937329e50d56035d004c898b0a
  "0xbe5c27cc5ce3fa9b2258eb4f7bbab3c185d241c76c9acfcbc3474b36766172da", //0xbe5c27cc5ce3fa9b2258eb4f7bbab3c185d241c76c9acfcbc3474b36766172da
  ]
- claimInfo - ["0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", 0, 0, 4]

4. ### Sepolia

signature - 0x95bd04e46fef5183dab559377c1f6427599706e9d4c37fe60d35c393610a70a347424524a81ade86965ab71e517459da75f28404a1f852f6e453aa2f3127d2ae1c

1. `createLeaves`

OUTPUT:

- leaves - [
  [
  "0xe4a98d2bfd66ce08128fdfffc9070662e489a28e",
  "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f",
  "0",
  "4283030"
  ],
  [
  "0xe4a98d2bfd66ce08128fdfffc9070662e489a28e",
  "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f",
  "1",
  "4283024"
  ],
  [
  "0xe4a98d2bfd66ce08128fdfffc9070662e489a28e",
  "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f",
  "2",
  "4283030"
  ],
  [
  "0xe4a98d2bfd66ce08128fdfffc9070662e489a28e",
  "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f",
  "3",
  "4283030"
  ],
  [
  "0xe4a98d2bfd66ce08128fdfffc9070662e489a28e",
  "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f",
  "4",
  "4283030"
  ],
  [
  "0xe4a98d2bfd66ce08128fdfffc9070662e489a28e",
  "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f",
  "5",
  "4283030"
  ]
  ]

- totalHeld - 54

2. `createMerkle`

INPUT:

- leaves - above object
  OUTPUT:
- root - 0xd16a3b414e020926d93561705a61fc7b8f19c443c2cce37795d554aab5a5a830

3. `createEvent`

INPUT:

- nftAddress: 0x52469E13ac6DdbFbf803F48E7106f8294E2B888f
- rewardToken: 0x0000000000000000000000000000000000000000
- rewardAmount: 0
- creator: 0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E
- root: 0xd16a3b414e020926d93561705a61fc7b8f19c443c2cce37795d554aab5a5a830
- blockStart: 4283020
- blockEnd: 4283030
- totalHeld: 54
- signature: 0x25db29aa0affc3136cc4c07056a4b52a6197dbbf7eb7aba622ae7087e11098ba0fda7e98fa733fef531b717691049f2e6486e9b290adbeec1667f7513ec989361c

OUTPUT:

- m

4. `createProof`
   INPUT:

- eventId - 0
- holder -

OUTPUT:

- merkleProof - [
  {
  "Value": [
  "0xe4a98d2bfd66ce08128fdfffc9070662e489a28e",
  "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f",
  "0",
  "4283030"
  ],
  "Proof": [
  "0x1a2ebc620fac4381f362fbbbc78d804f51d5dbd8f2da853a45ac070b2ed7be4a",
  "0x633c0c6915fcdb2ef3df589771dba71b13add953936783a02d6ba820b1028a20",
  "0x2799a5611c98a45789e2a7f0d456e3330fbe9801ed514f2086d0466b05c2f088"
  ]
  },
  {
  "Value": [
  "0xe4a98d2bfd66ce08128fdfffc9070662e489a28e",
  "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f",
  "1",
  "4283024"
  ],
  "Proof": [
  "0x6230c7deeba2e154b2c8504a9c2f623ca737cfebebcfb7ff662e46382bee5541",
  "0xfada35f7aff8960dc13a6b73c8d8c02718eb405666d9c3ffb0a4fa46b3067889",
  "0x2799a5611c98a45789e2a7f0d456e3330fbe9801ed514f2086d0466b05c2f088"
  ]
  },
  {
  "Value": [
  "0xe4a98d2bfd66ce08128fdfffc9070662e489a28e",
  "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f",
  "2",
  "4283030"
  ],
  "Proof": [
  "0x56cf7fd6c858777a9a0dfb29f4bc0a5724296f05470a2f2577e3c38ca88f8964",
  "0x633c0c6915fcdb2ef3df589771dba71b13add953936783a02d6ba820b1028a20",
  "0x2799a5611c98a45789e2a7f0d456e3330fbe9801ed514f2086d0466b05c2f088"
  ]
  },
  {
  "Value": [
  "0xe4a98d2bfd66ce08128fdfffc9070662e489a28e",
  "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f",
  "3",
  "4283030"
  ],
  "Proof": [
  "0xb097c1f31b115805827f9caa2f47ed64eb2638d1eb42e501f3192dae965855ed",
  "0x0c509b2d9f0f763f3d2fd51f719a2b658c59e2ddf00403b4a17ab24fdec5082c"
  ]
  },
  {
  "Value": [
  "0xe4a98d2bfd66ce08128fdfffc9070662e489a28e",
  "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f",
  "4",
  "4283030"
  ],
  "Proof": [
  "0x9353681c443b2f04714e33f4bfe53486dfb24049710d211ba5a6d1d91780aa43",
  "0xfada35f7aff8960dc13a6b73c8d8c02718eb405666d9c3ffb0a4fa46b3067889",
  "0x2799a5611c98a45789e2a7f0d456e3330fbe9801ed514f2086d0466b05c2f088"
  ]
  },
  {
  "Value": [
  "0xe4a98d2bfd66ce08128fdfffc9070662e489a28e",
  "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f",
  "5",
  "4283030"
  ],
  "Proof": [
  "0xe7cbbcb750ea571b385ae7d5a7b297734d0a666be991078b26d7c763ac1a04d1",
  "0x0c509b2d9f0f763f3d2fd51f719a2b658c59e2ddf00403b4a17ab24fdec5082c"
  ]
  }
  ]

5. `createClaim`

Input:

tokenId 0 Input:

- proof - 0x1a2ebc620fac4381f362fbbbc78d804f51d5dbd8f2da853a45ac070b2ed7be4a,0x633c0c6915fcdb2ef3df589771dba71b13add953936783a02d6ba820b1028a20,0x2799a5611c98a45789e2a7f0d456e3330fbe9801ed514f2086d0466b05c2f088
- holder - 0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E
- to - 0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E
- tokenId - 0
- eventId - 0
- heldUntil - 4283030

tokenId 1 Input:

- proof - 0x6230c7deeba2e154b2c8504a9c2f623ca737cfebebcfb7ff662e46382bee5541,0xfada35f7aff8960dc13a6b73c8d8c02718eb405666d9c3ffb0a4fa46b3067889,0x2799a5611c98a45789e2a7f0d456e3330fbe9801ed514f2086d0466b05c2f088
- holder - 0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E
- to - 0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E
- tokenId - 1
- eventId - 0
- heldUntil - 4283024

tokenId 2 Input:

- proof - 0x56cf7fd6c858777a9a0dfb29f4bc0a5724296f05470a2f2577e3c38ca88f8964,0x633c0c6915fcdb2ef3df589771dba71b13add953936783a02d6ba820b1028a20,0x2799a5611c98a45789e2a7f0d456e3330fbe9801ed514f2086d0466b05c2f088
- holder - 0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E
- to - 0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E
- tokenId - 2
- eventId - 0
- heldUntil - 4283030

tokenId 3 Input:

- proof - 0xb097c1f31b115805827f9caa2f47ed64eb2638d1eb42e501f3192dae965855ed,0x0c509b2d9f0f763f3d2fd51f719a2b658c59e2ddf00403b4a17ab24fdec5082c
- holder - 0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E
- to - 0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E
- tokenId - 3
- eventId - 0
- heldUntil - 4283030

tokenId 4 Input:

- proof - 0x9353681c443b2f04714e33f4bfe53486dfb24049710d211ba5a6d1d91780aa43,0xfada35f7aff8960dc13a6b73c8d8c02718eb405666d9c3ffb0a4fa46b3067889,0x2799a5611c98a45789e2a7f0d456e3330fbe9801ed514f2086d0466b05c2f088
- holder - 0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E
- to - 0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E
- tokenId - 4
- eventId - 0
- heldUntil - 4283030

tokenId 5 Input:

- proof - 0xe7cbbcb750ea571b385ae7d5a7b297734d0a666be991078b26d7c763ac1a04d1,0x0c509b2d9f0f763f3d2fd51f719a2b658c59e2ddf00403b4a17ab24fdec5082c
- holder - 0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E
- to - 0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E
- tokenId - 5
- eventId - 0
- heldUntil - 4283030

### Avalanche Fuji

100 tokens-100000000000000000000
ERC20-0x1972F66EB6f6E9d77D8f1C197E4F695b18005A00
NFT-0xFBFaFcDAc168FE115be7dC6ED5780c49983749Cc
Claim-0x5b50F2DF5BEF22E180c49fDe7d4d678691216A3d
Start-28366140
End-28366150
Signature-0x6f1fbb1a1a450e5c04c244fbc82ad3d2501d6b24e2dc1ade6b18d101bf02eadb633e29df0acbd0dc7537f7738ebebd8c0b2984070a0324a97267a4d4989e6ff91b
Root-0x7ffdb822a825ccd97210e61f01db81abfca892467cda86d26a086b62ecf7d51a
Leaves- [
[
"0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
"0xFBFaFcDAc168FE115be7dC6ED5780c49983749Cc",
"0",
"28366150"
],
[
"0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
"0xFBFaFcDAc168FE115be7dC6ED5780c49983749Cc",
"1",
"28366150"
],
[
"0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
"0xFBFaFcDAc168FE115be7dC6ED5780c49983749Cc",
"2",
"28366150"
],
[
"0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
"0xFBFaFcDAc168FE115be7dC6ED5780c49983749Cc",
"3",
"28366150"
],
[
"0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
"0xFBFaFcDAc168FE115be7dC6ED5780c49983749Cc",
"4",
"28366150"
],
[
"0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
"0xFBFaFcDAc168FE115be7dC6ED5780c49983749Cc",
"5",
"28366150"
]
]

Proof-[
{
"Value": [
"0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
"0xFBFaFcDAc168FE115be7dC6ED5780c49983749Cc",
"0",
"28366150"
],
"Proof": [
"0x527cf9c9c816cdd7d7dc419c5a2040c98514348d0ba6b580804a8404e4e1c765",
"0xa6f517a25b75810b705d5ec1839e863d7ff9861f3703ac5d7317c139f0b9920c",
"0xd07ac14deca22d07a2efb65b0282b0f2e3e03fe0a8e7795320548ab934353cd1"
]
},
{
"Value": [
"0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
"0xFBFaFcDAc168FE115be7dC6ED5780c49983749Cc",
"1",
"28366150"
],
"Proof": [
"0xba91ed1ee3404c0efe5e420c8126eb7740b26d3b9294761b6d46547e532efdd3",
"0x433e5e231dd39b6b6384f03bae4b1c08286cdab2dab6e81c1b55821edb5e8c38",
"0xd07ac14deca22d07a2efb65b0282b0f2e3e03fe0a8e7795320548ab934353cd1"
]
},
{
"Value": [
"0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
"0xFBFaFcDAc168FE115be7dC6ED5780c49983749Cc",
"2",
"28366150"
],
"Proof": [
"0x8c04ddf56ef017a7451e1d0484f54854a53e3a6a6473409f03d1926003837d14",
"0x433e5e231dd39b6b6384f03bae4b1c08286cdab2dab6e81c1b55821edb5e8c38",
"0xd07ac14deca22d07a2efb65b0282b0f2e3e03fe0a8e7795320548ab934353cd1"
]
},
{
"Value": [
"0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
"0xFBFaFcDAc168FE115be7dC6ED5780c49983749Cc",
"3",
"28366150"
],
"Proof": [
"0xbe184d7014708a80c69b52f4b78362c18df6c2032fe5d672067608433ced1581",
"0xa086f72797834e755ba5c84babe6b7070dc938be06aaa375adc9636931ab21f7"
]
},
{
"Value": [
"0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
"0xFBFaFcDAc168FE115be7dC6ED5780c49983749Cc",
"4",
"28366150"
],
"Proof": [
"0x64e681bd9807b607783dc4a6228a429b63bf302b3b1f618742b8056fb7428645",
"0xa6f517a25b75810b705d5ec1839e863d7ff9861f3703ac5d7317c139f0b9920c",
"0xd07ac14deca22d07a2efb65b0282b0f2e3e03fe0a8e7795320548ab934353cd1"
]
},
{
"Value": [
"0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
"0xFBFaFcDAc168FE115be7dC6ED5780c49983749Cc",
"5",
"28366150"
],
"Proof": [
"0xf4accbda8fef09f0f80b0848f403337cefb3ad7c02d446d81cd553566a62a930",
"0xa086f72797834e755ba5c84babe6b7070dc938be06aaa375adc9636931ab21f7"
]
}
]

tokenId 0 Input:

- proof - 0x527cf9c9c816cdd7d7dc419c5a2040c98514348d0ba6b580804a8404e4e1c765,0xa6f517a25b75810b705d5ec1839e863d7ff9861f3703ac5d7317c139f0b9920c,0xd07ac14deca22d07a2efb65b0282b0f2e3e03fe0a8e7795320548ab934353cd1
- holder - 0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E
- to - 0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E
- tokenId - 0
- eventId - 1
- heldUntil - 28366150

tokenId 1 Input:

- proof - 0xba91ed1ee3404c0efe5e420c8126eb7740b26d3b9294761b6d46547e532efdd3,0x433e5e231dd39b6b6384f03bae4b1c08286cdab2dab6e81c1b55821edb5e8c38,0xd07ac14deca22d07a2efb65b0282b0f2e3e03fe0a8e7795320548ab934353cd1
- holder - 0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E
- to - 0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E
- tokenId - 1
- eventId - 1
- heldUntil - 28366150

### Polygon Mumbai

100 tokens-100000000000000000000
ERC20-0x3242f077DF131827551bB4086F6e4caA01E3B5cF
NFT-0xc2A9BE5eD3344691AFA6243F661a58Ae8DdD8749
Claim-0x0a9105Db292FB07530Bfa3FB3B9eD45878881463
Start-43385161
End-43385171
Signature-0x70712f23d50254a56fe30b0827712a54318a117ab7a5b004dfffc6e91b7cb2200a67656154cb4c903af52074902dd3d80d3fb07a0951ef75f12fb7db9f92f8fb1c
Root-0xd65d3ed85b32b7c5a6fde00e194f9d98a506dbbe92f94be1b63fab064bafbe9a
Leaves-[
[
"0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
"0xc2A9BE5eD3344691AFA6243F661a58Ae8DdD8749",
"0",
"43385171"
],
[
"0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
"0xc2A9BE5eD3344691AFA6243F661a58Ae8DdD8749",
"1",
"43385171"
],
[
"0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
"0xc2A9BE5eD3344691AFA6243F661a58Ae8DdD8749",
"2",
"43385171"
],
[
"0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
"0xc2A9BE5eD3344691AFA6243F661a58Ae8DdD8749",
"3",
"43385171"
],
[
"0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
"0xc2A9BE5eD3344691AFA6243F661a58Ae8DdD8749",
"4",
"43385171"
],
[
"0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
"0xc2A9BE5eD3344691AFA6243F661a58Ae8DdD8749",
"5",
"43385171"
]
]

Proof-[
{
"Value": [
"0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
"0xc2A9BE5eD3344691AFA6243F661a58Ae8DdD8749",
"0",
"43385171"
],
"Proof": [
"0x8c2b5486c6cef8f9f8cb45cc3a72f78bf9005ff6c4f6cd65fb041384d60d0555",
"0x26087285bbf1c5ab8228a41c6cf81aa0a40cc3604f3fa947aedadb1b5d85f2d1",
"0xf7cc6617f18adc4c07c145262996dff6d20a919920377fc3cb8429172d66e674"
]
},
{
"Value": [
"0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
"0xc2A9BE5eD3344691AFA6243F661a58Ae8DdD8749",
"1",
"43385171"
],
"Proof": [
"0x3fca119af6ce2431f829d9e58d59ab2b6afe6bd79f4071e7c816e19d6f03d2a5",
"0x26087285bbf1c5ab8228a41c6cf81aa0a40cc3604f3fa947aedadb1b5d85f2d1",
"0xf7cc6617f18adc4c07c145262996dff6d20a919920377fc3cb8429172d66e674"
]
},
{
"Value": [
"0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
"0xc2A9BE5eD3344691AFA6243F661a58Ae8DdD8749",
"2",
"43385171"
],
"Proof": [
"0xcb42135e74e72eb3a7609acd86fa18c72e3899bb0104553716df86864389b2de",
"0x28c4051d103a48a179928be92aed119050e2603c49659bdf07427c09ebaff205"
]
},
{
"Value": [
"0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
"0xc2A9BE5eD3344691AFA6243F661a58Ae8DdD8749",
"3",
"43385171"
],
"Proof": [
"0xcd4b15f1ce924d48e11dd72e08395772c9b4e8dc1d1e148df0617b94be1b6599",
"0x28c4051d103a48a179928be92aed119050e2603c49659bdf07427c09ebaff205"
]
},
{
"Value": [
"0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
"0xc2A9BE5eD3344691AFA6243F661a58Ae8DdD8749",
"4",
"43385171"
],
"Proof": [
"0x10d2aab71983e10b22a90b7721f62dc1fed7b84ce7ef7401e9abec7194e8d3b9",
"0x60af44f93b403f4f4f12bcb96b1e3f484fe1de9e97c228d1b042b07939c1c962",
"0xf7cc6617f18adc4c07c145262996dff6d20a919920377fc3cb8429172d66e674"
]
},
{
"Value": [
"0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E",
"0xc2A9BE5eD3344691AFA6243F661a58Ae8DdD8749",
"5",
"43385171"
],
"Proof": [
"0x175d26c4a7ada7429f6264e26897f84e52f03be9979f94fc14f6f5e98ed096fe",
"0x60af44f93b403f4f4f12bcb96b1e3f484fe1de9e97c228d1b042b07939c1c962",
"0xf7cc6617f18adc4c07c145262996dff6d20a919920377fc3cb8429172d66e674"
]
}
]

tokenId 0 Input:

- proof - 0x8c2b5486c6cef8f9f8cb45cc3a72f78bf9005ff6c4f6cd65fb041384d60d0555,0x26087285bbf1c5ab8228a41c6cf81aa0a40cc3604f3fa947aedadb1b5d85f2d1,0xf7cc6617f18adc4c07c145262996dff6d20a919920377fc3cb8429172d66e674
- holder - 0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E
- to - 0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E
- tokenId - 0
- eventId - 0
- heldUntil - 43385171

tokenId 1 Input:

- proof - 0x3fca119af6ce2431f829d9e58d59ab2b6afe6bd79f4071e7c816e19d6f03d2a5,0x26087285bbf1c5ab8228a41c6cf81aa0a40cc3604f3fa947aedadb1b5d85f2d1,0xf7cc6617f18adc4c07c145262996dff6d20a919920377fc3cb8429172d66e674
- holder - 0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E
- to - 0xF46A033aFCF3AC3777885A5f4E2fb6f54f6f6741
- tokenId - 1
- eventId - 0
- heldUntil - 43385171
- signature - 0xae9f70d8778d08253842325d25fd257c20f5f48977c98ce39b668324f66688a55ab9cf0e8779d0d7a8356d22445082cec55eeaea1e164cf20b385ff28269d0611b
- signer - account 2 on metamask 0xF46A033aFCF3AC3777885A5f4E2fb6f54f6f6741

tokenId 2 Input:

- proof - 0xcb42135e74e72eb3a7609acd86fa18c72e3899bb0104553716df86864389b2de,0x28c4051d103a48a179928be92aed119050e2603c49659bdf07427c09ebaff205
- holder - 0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E
- to - 0xF46A033aFCF3AC3777885A5f4E2fb6f54f6f6741
- tokenId - 2
- eventId - 0
- heldUntil - 43385171
- signature - 0xbc1fac42b4d4d791816b73c312e79fc017c1bd699d6dc881c8465216f991dc172ecee6adb8b823296ed0febb6624a5c1dbe3d42330b55ef5d5f18bbe3fd864d71b
- signer - account 2 on metamask 0xF46A033aFCF3AC3777885A5f4E2fb6f54f6f6741
