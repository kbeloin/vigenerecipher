
/*
    Tests for encryption
*/
QUnit.module('Encryption Tests', function () {
    QUnit.test('Encryption - no punctuation', function (assert) {
        var plaintext = "This is a simple test";
        var key = "thisisthefirsttestcasekey";
        var ciphertext = encrypt(plaintext, key);
        var expectedResult = "Moqk qk t zmrxcw mxwl";
        assert.strictEqual(ciphertext, expectedResult, "Expected result matches the produced ciphertext.");
    });

    QUnit.test('Encryption - plaintext with punctuation', function (assert) {
        var plaintext = "This plaintext contains some punctuation, which should be ignored.";
        var key = "thisisthesecondtestcasekey";
        var ciphertext = encrypt(plaintext, key);
        var expectedResult = "Moqk xdtprlizh prgxsbps kswi nnuklcsmpsf, ajwpk llgnnd ti sklhymv.";
        assert.strictEqual(ciphertext, expectedResult, "Expected result matches the produced ciphertext.");
    });

    QUnit.test('Encryption - key contains spaces', function (assert) {
        var plaintext = "This plaintext contains some punctuation, which should be ignored.";
        var key = "key with spaces";
        var ciphertext = encrypt(plaintext, key);
        var expectedResult = "Dlgo xehactgbl mslpibuk hooi herapctaadn, ylaml qdwnsv qe kkfyvcz.";
        assert.strictEqual(ciphertext, expectedResult, "Expected result matches the produced ciphertext.");
    });
    QUnit.module('Invalid Input', function () {
        QUnit.test('Encryption - null plaintext', function (assert) {
            var plaintext = null;
            var key = "key with spaces";
            var ciphertext = "";
            var thrownException = null;
            try {
                ciphertext = encrypt(plaintext, key);
            } catch (err) {
                thrownException = err;
            }
            assert.notOk(thrownException == null, "Failing because no exception is thrown on null plaintext input.");

        });

        QUnit.test('Encryption - null key', function (assert) {
            var plaintext = "This is a test message";
            var key = null;
            var thrownException = null;
            var ciphertext = null;
            try {
                ciphertext = encrypt(plaintext, key);
            } catch (err) {
                thrownException = err;
            }
            assert.notOk(thrownException == null, "Failing because no exception is thrown on null key input.");
        });

        QUnit.test('Encryption - empty string for plaintext', function (assert) {
            var plaintext = "";
            var key = "key";
            var thrownException = null;
            var ciphertext = null;
            try {
                ciphertext = encrypt(plaintext, key);
            } catch (err) {
                thrownException = err;
            }
            assert.notOk(thrownException == null, "Failing because no exception is thrown on empty string for plaintext input.");
        });

        QUnit.test('Encryption - empty string for key', function (assert) {
            var plaintext = "This is a test message";
            var key = "";
            var thrownException = null;
            var ciphertext = null;
            try {
                ciphertext = encrypt(plaintext, key);
            } catch (err) {
                thrownException = err;
            }
            assert.notOk(thrownException == null, "Failing because no exception is thrown on empty string for key input.");
        });
        QUnit.test('Encryption - invalid key (numbers)', function(assert) {
            var plaintext = "This is a test message";
            var key = "abc123";
            var thrownException = null;
            var ciphertext = null;
            try {
                ciphertext = encrypt(plaintext, key);
            } catch (err) {
                thrownException = err;
            }
            assert.notOk(thrownException == null, "Failing because no exception is thrown on invalid key input.");
        });

        QUnit.test('Encryption - invalid key (special char)', function(assert) {
            var plaintext = "This is a test message";
            var key = "gre@tkey";
            var thrownException = null;
            var ciphertext = null;
            try {
                ciphertext = encrypt(plaintext, key);
            } catch (err) {
                thrownException = err;
            }
            assert.notOk(thrownException == null, "Failing because no exception is thrown on invalid key input.");
        });
    });
});


/*

Tests for decryption

*/
QUnit.module('Decryption Tests', function () {
    QUnit.test('Decryption - simple ciphertext/key', function (assert) {
        var ciphertext = "Lpuh xicwyym ewzyvh skm fwp ooc qaubapooc";
        var key = "simplekey";
        var expectedResult = "This message should use the key simplekey";
        var actualResult = decrypt(ciphertext, key);
        assert.strictEqual(actualResult, expectedResult, 'The expected plaintext matches the actual plaintext.');
    });
    QUnit.test('Decryption - Ciphertext with punctuation', function (assert) {
        var ciphertext = "BihpDgbmnl qe p nsyp jsvsjlko, fsl Q'y p qex sd kmdkpv-cmbw xddrvkqkavs.";
        var key = "simplekey";
        var expectedResult = "JavaScript is a cool language, but I'm a fan of server-side programming.";
        var actualResult = decrypt(ciphertext, key);
        assert.strictEqual(actualResult, expectedResult, 'The expected plaintext matches the actual plaintext.');
    });
    QUnit.test('Decryption - key contains spaces', function (assert) {
        var ciphertext = "TetwAvyaet kw s msmh ttuyjaii, tex G'i i yhf df uijfip-oqwl hgoivswqgjo.";
        var key = "key with spaces";
        var expectedResult = "JavaScript is a cool language, but I'm a fan of server-side programming.";
        var actualResult = decrypt(ciphertext, key);
        assert.strictEqual(actualResult, expectedResult, 'The expected plaintext matches the actual plaintext.');
    });
    QUnit.module('Invalid Input', function() {
        QUnit.test('Decryption - null ciphertext', function (assert) {
            var plaintext = null;
            var key = "key with spaces";
            var ciphertext = null;
            var thrownException = null;
            try {
                plaintext = decrypt(ciphertext, key);
            } catch (err) {
                thrownException = err;
            }
            assert.notOk(thrownException == null, "Failing because no exception is thrown on null plaintext input.");

        });

        QUnit.test('Decryption - null key', function (assert) {
            var plaintext = "";
            var key = null;
            var thrownException = null;
            var ciphertext = null;
            try {
                plaintext = decrypt(ciphertext, key);
            } catch (err) {
                thrownException = err;
            }
            assert.notOk(thrownException == null, "Failing because no exception is thrown on null key input.");
        });

        QUnit.test('Decryption - empty string for plaintext', function (assert) {
            var plaintext = "";
            var key = "key";
            var thrownException = null;
            var ciphertext = null;
            try {
                plaintext = decrypt(ciphertext, key);
            } catch (err) {
                thrownException = err;
            }
            assert.notOk(thrownException == null, "Failing because no exception is thrown on empty string for plaintext input.");
        });

        QUnit.test('Decryption - empty string for key', function (assert) {
            var plaintext = "This is a test message";
            var key = "";
            var thrownException = null;
            var ciphertext = null;
            try {
                plaintext = decrypt(ciphertext, key);
            } catch (err) {
                thrownException = err;
            }
            assert.notOk(thrownException == null, "Failing because no exception is thrown on empty string for key input.");
        });

        QUnit.test('Decryption - invalid key (numbers)', function (assert) {
            var plaintext = "This is a test message";
            var key = "t3stkey";
            var thrownException = null;
            var ciphertext = null;
            try {
                plaintext = decrypt(ciphertext, key);
            } catch (err) {
                thrownException = err;
            }
            assert.notOk(thrownException == null, "Failing because no exception is thrown on invalid key input.");
        });

        QUnit.test('Decryption - invalid key (special char)', function (assert) {
            var plaintext = "This is a test message";
            var key = "b@dkey";
            var thrownException = null;
            var ciphertext = null;
            try {
                plaintext = decrypt(ciphertext, key);
            } catch (err) {
                thrownException = err;
            }
            assert.notOk(thrownException == null, "Failing because no exception is thrown on invalid key input.");
        });

    });

});


