import {TransactionService} from './transaction.service';
import {User} from '../user/user.interface';
import {Test} from '@nestjs/testing';
import {getModelToken} from '@nestjs/mongoose';
import {MongoModelMock} from '../../test/mocks/mongo-model.mock';

describe('Transaction Service', () => {

    const userId = '123';
    const user: User = {
        id: userId,
        email: 'a@a.a',
        nickname: '',
        name: '',
    };

    let transactionService: TransactionService;

    beforeEach(async () => {
        const testingModule = await Test.createTestingModule({
            providers: [
                TransactionService,
                {
                    provide: getModelToken('Transaction'),
                    useValue: MongoModelMock,
                },
            ],
        }).compile();

        transactionService = testingModule.get<TransactionService>(TransactionService);

    });

    describe('when transaction is created', () => {
        const transaction = {value: 1};

        it('should call create method with transaction data', async () => {
            await  transactionService.create(transaction);

            expect(MongoModelMock.create).toHaveBeenCalledWith(transaction);
            expect(MongoModelMock.mockFunctions.save).toHaveBeenCalledTimes(1);
        });
    });

    describe('when all transactions are requested', () => {
        beforeAll(async () => {
            await transactionService.findAll(user);
        });

        it('should call find with proper query parameters', async () => {
            expect(MongoModelMock.find).toHaveBeenCalledWith({owner: userId});
        });

        it('should call exec method once', async () => {
            expect(MongoModelMock.mockFunctions.exec).toHaveBeenCalledTimes(1);
        });
    });
});
