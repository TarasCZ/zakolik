import {TransactionService, UnauthorizedTransactionUpdateException} from './transaction.service';
import {Test} from '@nestjs/testing';
import {RepositoryMock} from '../../test/mocks/repository.mock';
import {getRepositoryToken} from '@nestjs/typeorm';
import {TransactionEntity} from './transaction.entity';
import {TransactionTestFactory} from '../../test/test-factory/transaction-test.factory';
import {UserTestFactory} from '../../test/test-factory/user-test.factory';
import {Transaction} from './transaction.model';
import {User} from '../user/user.model';

describe('Transaction Service', () => {

    let user: User;
    let user2: User;
    let transaction: Transaction;
    let transactionEntity: TransactionEntity;
    let repositoryMock: RepositoryMock<TransactionEntity>;

    let transactionService: TransactionService;

    beforeEach(async () => {
        user = UserTestFactory.createUser({ id: '123' });
        user2 = UserTestFactory.createUser({ id: '000' });
        transaction = TransactionTestFactory.createTransaction();
        transactionEntity = { ...transaction, user };
        repositoryMock = new RepositoryMock();
        repositoryMock.findOneResult = transactionEntity;

        const testingModule = await Test.createTestingModule({
            providers: [
                TransactionService,
                {
                    provide: getRepositoryToken(TransactionEntity),
                    useValue: repositoryMock,
                },
            ],
        }).compile();

        transactionService = testingModule.get<TransactionService>(TransactionService);
    });

    describe('when transaction is created', () => {
        it('should throw HttpException when user does not match', async () => {
            await expect(transactionService.create(transaction, user2))
                .rejects.toEqual(UnauthorizedTransactionUpdateException);
        });

        it('should call save method with transaction data', async () => {
            await transactionService.create(transaction, user);

            expect(repositoryMock.save).toHaveBeenCalledWith(transactionEntity);
            expect(repositoryMock.save).toHaveBeenCalledTimes(1);
        });
    });

    describe('when all transactions are requested', () => {
        it('should call find with proper query parameters once', async () => {
            await transactionService.findAll(user);

            expect(repositoryMock.find).toHaveBeenCalledWith({ user });
            expect(repositoryMock.find).toHaveBeenCalledTimes(1);
        });
    });

    describe('when transaction is deleted', async () => {
        it('should call delete with proper query parameters once', async () => {
            const { id } = transaction;
            await transactionService.delete(id, user);

            expect(repositoryMock.delete).toHaveBeenCalledWith({ id, user });
            expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
        });
    });
});
