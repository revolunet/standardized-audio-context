import 'reflect-metadata';
import { AudioBufferWrapper } from '../../src/wrapper/audio-buffer';
import { AudioNodeConnectMethodWrapper } from '../../src/wrapper/audio-node-connect-method';
import { AudioNodeDisconnectMethodWrapper } from '../../src/wrapper/audio-node-disconnect-method';
import { ChainingSupportTester } from '../../src/tester/chaining-support';
import { DisconnectingSupportTester } from '../../src/tester/disconnecting-support';
import { EncodingErrorFactory } from '../../src/factories/encoding-error';
import { InvalidStateErrorFactory } from  '../../src/factories/invalid-state-error';
import { NotSupportedErrorFactory } from  '../../src/factories/not-supported-error';
import { OfflineAudioBufferSourceNodeFakerFactory } from '../../src/factories/offline-audio-buffer-source-node';
import { OfflineAudioDestinationNodeFakerFactory } from '../../src/factories/offline-audio-destination-node';
import { OfflineBiquadFilterNodeFakerFactory } from '../../src/factories/offline-biquad-filter-node';
import { OfflineGainNodeFakerFactory } from '../../src/factories/offline-gain-node';
import { OfflineIIRFilterNodeFakerFactory } from '../../src/factories/offline-iir-filter-node';
import { PromiseSupportTester } from '../../src/tester/promise-support';
import { ReflectiveInjector } from '@angular/core';
import { loadFixture } from '../helper/load-fixture';
import { offlineAudioContextConstructor } from '../../src/offline-audio-context-constructor';
import { spy } from 'sinon';
import { unpatchedOfflineAudioContextConstructor } from '../../src/unpatched-offline-audio-context-constructor';
import { window as wndw } from '../../src/window';

describe('offlineAudioContextConstructor', function () {

    var offlineAudioContext,
        OfflineAudioContext;

    beforeEach(function () {
        /* eslint-disable indent */
        var injector = ReflectiveInjector.resolveAndCreate([
                AudioBufferWrapper,
                AudioNodeConnectMethodWrapper,
                AudioNodeDisconnectMethodWrapper,
                ChainingSupportTester,
                DisconnectingSupportTester,
                EncodingErrorFactory,
                InvalidStateErrorFactory,
                NotSupportedErrorFactory,
                OfflineAudioBufferSourceNodeFakerFactory,
                OfflineAudioDestinationNodeFakerFactory,
                OfflineBiquadFilterNodeFakerFactory,
                OfflineGainNodeFakerFactory,
                OfflineIIRFilterNodeFakerFactory,
                PromiseSupportTester,
                { provide: offlineAudioContextConstructor, useFactory: offlineAudioContextConstructor },
                { provide: unpatchedOfflineAudioContextConstructor, useFactory: unpatchedOfflineAudioContextConstructor },
                { provide: wndw, useValue: window }
            ]);
        /* eslint-enable indent */

        OfflineAudioContext = injector.get(offlineAudioContextConstructor);

        // Chrome, Firefox and maybe others as well do not call a ScriptProcessorNode if the length
        // is 128 samples or less.
        offlineAudioContext = new OfflineAudioContext(2, 129, 44100);
    });

    describe('destination', function () {

        it('should be an instance of the AudioDestinationNode interface', function () {
            var destination = offlineAudioContext.destination;

            // @todo expect(destination.channelCount).to.equal(2);
            // @todo expect(destination.channelCountMode).to.equal('explicit');
            expect(destination.channelInterpretation).to.equal('speakers');
            expect(destination.maxChannelCount).to.be.a('number');
            // @todo expect(destination.maxChannelCount).to.equal( number of channels );
            expect(destination.numberOfInputs).to.equal(1);
            expect(destination.numberOfOutputs).to.equal(0);
        });

        it('should be readonly', function () {
            expect(function () {
                offlineAudioContext.destination = 'a fake AudioDestinationNode';
            }).to.throw(TypeError);
        });

    });

    describe('length', function () {

        it('should expose its length', function () {
            expect(offlineAudioContext.length).to.equal(129);
        });

        it('should be readonly', function () {
            expect(function () {
                offlineAudioContext.length = 128;
            }).to.throw(TypeError);
        });

    });

    describe('sampleRate', function () {

        it('should be a number', function () {
            expect(offlineAudioContext.sampleRate).to.equal(44100);
        });

        it('should be readonly', function () {
            expect(function () {
                offlineAudioContext.sampleRate = 22050;
            }).to.throw(TypeError);
        });

    });

    describe('createBiquadFilter()', function () {

        it('should return an instance of the BiquadFilterNode interface', function () {
            var biquadFilterNode = offlineAudioContext.createBiquadFilter();

            expect(biquadFilterNode.channelCountMode).to.equal('max');
            expect(biquadFilterNode.channelInterpretation).to.equal('speakers');

            expect(biquadFilterNode.detune.cancelScheduledValues).to.be.a('function');
            expect(biquadFilterNode.detune.defaultValue).to.equal(0);
            expect(biquadFilterNode.detune.exponentialRampToValueAtTime).to.be.a('function');
            expect(biquadFilterNode.detune.linearRampToValueAtTime).to.be.a('function');
            expect(biquadFilterNode.detune.setTargetAtTime).to.be.a('function');
            expect(biquadFilterNode.detune.setValueCurveAtTime).to.be.a('function');
            expect(biquadFilterNode.detune.value).to.equal(0);

            expect(biquadFilterNode.frequency.cancelScheduledValues).to.be.a('function');
            expect(biquadFilterNode.frequency.defaultValue).to.equal(350);
            expect(biquadFilterNode.frequency.exponentialRampToValueAtTime).to.be.a('function');
            expect(biquadFilterNode.frequency.linearRampToValueAtTime).to.be.a('function');
            expect(biquadFilterNode.frequency.setTargetAtTime).to.be.a('function');
            expect(biquadFilterNode.frequency.setValueCurveAtTime).to.be.a('function');
            expect(biquadFilterNode.frequency.value).to.equal(350);

            expect(biquadFilterNode.gain.cancelScheduledValues).to.be.a('function');
            expect(biquadFilterNode.gain.defaultValue).to.equal(0);
            expect(biquadFilterNode.gain.exponentialRampToValueAtTime).to.be.a('function');
            expect(biquadFilterNode.gain.linearRampToValueAtTime).to.be.a('function');
            expect(biquadFilterNode.gain.setTargetAtTime).to.be.a('function');
            expect(biquadFilterNode.gain.setValueCurveAtTime).to.be.a('function');
            expect(biquadFilterNode.gain.value).to.equal(0);

            expect(biquadFilterNode.getFrequencyResponse).to.be.a('function');
            expect(biquadFilterNode.numberOfInputs).to.equal(1);
            expect(biquadFilterNode.numberOfOutputs).to.equal(1);

            expect(biquadFilterNode.Q.cancelScheduledValues).to.be.a('function');
            expect(biquadFilterNode.Q.defaultValue).to.equal(1);
            expect(biquadFilterNode.Q.exponentialRampToValueAtTime).to.be.a('function');
            expect(biquadFilterNode.Q.linearRampToValueAtTime).to.be.a('function');
            expect(biquadFilterNode.Q.setTargetAtTime).to.be.a('function');
            expect(biquadFilterNode.Q.setValueCurveAtTime).to.be.a('function');
            expect(biquadFilterNode.Q.value).to.equal(1);

            expect(biquadFilterNode.type).to.be.a('string');
        });

        it('should be chainable', function () {
            var biquadFilterNode = offlineAudioContext.createBiquadFilter(),
                gainNode = offlineAudioContext.createGain();

            expect(biquadFilterNode.connect(gainNode)).to.equal(gainNode);
        });

        describe('getFrequencyResponse()', function () {

            it('should fill the magResponse and phaseResponse arrays', function () {
                var biquadFilterNode = offlineAudioContext.createBiquadFilter(),
                    magResponse = new Float32Array(5),
                    phaseResponse = new Float32Array(5);

                biquadFilterNode.getFrequencyResponse(new Float32Array([ 200, 400, 800, 1600, 3200 ]), magResponse, phaseResponse);

                expect(Array.from(magResponse)).to.deep.equal([ 1.1107852458953857, 0.8106917142868042, 0.20565471053123474, 0.04845593497157097, 0.011615658178925514 ]);
                expect(Array.from(phaseResponse)).to.deep.equal([ -0.7254799008369446, -1.8217267990112305, -2.6273605823516846, -2.906902313232422, -3.0283825397491455 ]);
            });

        });

    });

    describe('createGain()', function () {

        it('should return an instance of the GainNode interface', function () {
            var gainNode = offlineAudioContext.createGain();

            expect(gainNode.channelCountMode).to.equal('max');
            expect(gainNode.channelInterpretation).to.equal('speakers');

            expect(gainNode.gain.cancelScheduledValues).to.be.a('function');
            expect(gainNode.gain.defaultValue).to.equal(1);
            expect(gainNode.gain.exponentialRampToValueAtTime).to.be.a('function');
            expect(gainNode.gain.linearRampToValueAtTime).to.be.a('function');
            expect(gainNode.gain.setTargetAtTime).to.be.a('function');
            expect(gainNode.gain.setValueCurveAtTime).to.be.a('function');
            expect(gainNode.gain.value).to.equal(1);

            expect(gainNode.numberOfInputs).to.equal(1);
            expect(gainNode.numberOfOutputs).to.equal(1);
        });

        it('should be chainable', function () {
            var gainNodeA = offlineAudioContext.createGain(),
                gainNodeB = offlineAudioContext.createGain();

            expect(gainNodeA.connect(gainNodeB)).to.equal(gainNodeB);
        });

        it('should be disconnectable', function (done) {
            var candidate,
                dummy,
                ones,
                source;

            candidate = offlineAudioContext.createGain();
            dummy = offlineAudioContext.createGain();

            // Safari does not play buffers which contain just one frame.
            ones = offlineAudioContext.createBuffer(1, 2, 44100);
            ones.getChannelData(0)[0] = 1;
            ones.getChannelData(0)[1] = 1;

            source = offlineAudioContext.createBufferSource();
            source.buffer = ones;

            source.connect(candidate);
            candidate.connect(offlineAudioContext.destination);
            candidate.connect(dummy);
            candidate.disconnect(dummy);

            source.start(0);

            offlineAudioContext
                .startRendering()
                .then((renderedBuffer) => {
                    var channelData = renderedBuffer.getChannelData(0);

                    expect(channelData[0]).to.equal(1);

                    done();
                });
        });

    });

    describe('createIIRFilter()', function () {

        it('should return an instance of the IIRFilterNode interface', function () {
            var iIRFilterNode = offlineAudioContext.createIIRFilter([ 1 ], [ 1 ]);

            expect(iIRFilterNode.channelCountMode).to.equal('max');
            expect(iIRFilterNode.channelInterpretation).to.equal('speakers');

            expect(iIRFilterNode.getFrequencyResponse).to.be.a('function');

            expect(iIRFilterNode.numberOfInputs).to.equal(1);
            expect(iIRFilterNode.numberOfOutputs).to.equal(1);
        });

        it('should throw an InvalidStateError', function (done) {
            try {
                offlineAudioContext.createIIRFilter([ 0 ], [ 1 ]);
            } catch (err) {
                expect(err.code).to.equal(11);
                expect(err.name).to.equal('InvalidStateError');

                done();
            }
        });

        it('should throw an NotSupportedError', function (done) {
            try {
                offlineAudioContext.createIIRFilter([], [ 1 ]);
            } catch (err) {
                expect(err.code).to.equal(9);
                expect(err.name).to.equal('NotSupportedError');

                done();
            }
        });

        it('should throw an NotSupportedError', function (done) {
            try {
                offlineAudioContext.createIIRFilter([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21 ], [ 1 ]);
            } catch (err) {
                expect(err.code).to.equal(9);
                expect(err.name).to.equal('NotSupportedError');

                done();
            }
        });

        it('should throw an InvalidStateError', function (done) {
            try {
                offlineAudioContext.createIIRFilter([ 1 ], [ 0, 1 ]);
            } catch (err) {
                expect(err.code).to.equal(11);
                expect(err.name).to.equal('InvalidStateError');

                done();
            }
        });

        it('should throw an NotSupportedError', function (done) {
            try {
                offlineAudioContext.createIIRFilter([ 1 ], []);
            } catch (err) {
                expect(err.code).to.equal(9);
                expect(err.name).to.equal('NotSupportedError');

                done();
            }
        });

        it('should throw an NotSupportedError', function (done) {
            try {
                offlineAudioContext.createIIRFilter([ 1 ], [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21 ]);
            } catch (err) {
                expect(err.code).to.equal(9);
                expect(err.name).to.equal('NotSupportedError');

                done();
            }
        });

        it('should filter the given input', function (done) {
            var audioBuffer,
                audioBufferSourceNode,
                iIRFilterNode;

            this.timeout(10000);

            audioBuffer = offlineAudioContext.createBuffer(2, 3, 44100);
            audioBufferSourceNode = offlineAudioContext.createBufferSource();
            iIRFilterNode = offlineAudioContext.createIIRFilter([ 1, -1 ], [ 1, -0.5 ]);

            // @todo Use copyToChannel() once it becomes available.
            // buffer.copyToChannel(new Float32Array([1, 0, 0]), 0);
            // buffer.copyToChannel(new Float32Array([0, 1, 1]), 1);
            audioBuffer.getChannelData(0)[0] = 1;
            audioBuffer.getChannelData(0)[1] = 0;
            audioBuffer.getChannelData(0)[2] = 0;
            audioBuffer.getChannelData(1)[0] = 0;
            audioBuffer.getChannelData(1)[1] = 1;
            audioBuffer.getChannelData(1)[2] = 1;

            audioBufferSourceNode.buffer = audioBuffer;

            audioBufferSourceNode.start(0);

            audioBufferSourceNode
                .connect(iIRFilterNode)
                .connect(offlineAudioContext.destination);

            offlineAudioContext
                .startRendering()
                .then((renderedBuffer) => {
                    var leftChannelData = renderedBuffer.getChannelData(0),
                        rightChannelData = renderedBuffer.getChannelData(1);

                    expect(leftChannelData[0]).to.equal(1);
                    expect(leftChannelData[1]).to.equal(-0.5);
                    expect(leftChannelData[2]).to.equal(-0.25);

                    expect(rightChannelData[0]).to.be.closeTo(0, 1e-37);
                    expect(rightChannelData[1]).to.equal(1);
                    expect(rightChannelData[2]).to.equal(0.5);

                    done();
                });
        });

        it('should filter another given input', function (done) {
            var audioBuffer,
                audioBufferSourceNode,
                iIRFilterNode;

            this.timeout(10000);

            // Recreate an OfflineAudioContext with 3 channels.
            offlineAudioContext = new OfflineAudioContext(3, offlineAudioContext.length, offlineAudioContext.sampleRate);

            audioBuffer = offlineAudioContext.createBuffer(3, 3, 44100);
            audioBufferSourceNode = offlineAudioContext.createBufferSource();
            iIRFilterNode = offlineAudioContext.createIIRFilter([ 0.5, -1 ], [ 1, -1 ]);

            // @todo Use copyToChannel() once it becomes available.
            // buffer.copyToChannel(new Float32Array([1, 1, 1]), 0);
            // buffer.copyToChannel(new Float32Array([1, 0, 0]), 1);
            // buffer.copyToChannel(new Float32Array([0, 1, 1]), 2);
            audioBuffer.getChannelData(0)[0] = 1;
            audioBuffer.getChannelData(0)[1] = 1;
            audioBuffer.getChannelData(0)[2] = 1;

            audioBuffer.getChannelData(1)[0] = 1;
            audioBuffer.getChannelData(1)[1] = 0;
            audioBuffer.getChannelData(1)[2] = 0;

            audioBuffer.getChannelData(2)[0] = 0;
            audioBuffer.getChannelData(2)[1] = 1;
            audioBuffer.getChannelData(2)[2] = 1;

            audioBufferSourceNode.buffer = audioBuffer;

            audioBufferSourceNode.start(0);

            audioBufferSourceNode
                .connect(iIRFilterNode)
                .connect(offlineAudioContext.destination);

            offlineAudioContext
                .startRendering()
                .then((renderedBuffer) => {
                    var firstChannelData = renderedBuffer.getChannelData(0),
                        secondChannelData = renderedBuffer.getChannelData(1),
                        thirdChannelData = renderedBuffer.getChannelData(2);

                    expect(firstChannelData[0]).to.equal(0.5);
                    expect(firstChannelData[1]).to.equal(0);
                    expect(firstChannelData[2]).to.equal(-0.5);

                    expect(secondChannelData[0]).to.equal(0.5);
                    expect(secondChannelData[1]).to.equal(-0.5);
                    expect(secondChannelData[2]).to.equal(-0.5);

                    expect(thirdChannelData[0]).to.equal(0);
                    expect(thirdChannelData[1]).to.equal(0.5);
                    expect(thirdChannelData[2]).to.equal(0);

                    done();
                });
        });

        it('should be chainable', function () {
            var gainNode = offlineAudioContext.createGain(),
                iIRFilterNode = offlineAudioContext.createIIRFilter([ 1, -1 ], [ 1, -0.5 ]);

            expect(iIRFilterNode.connect(gainNode)).to.equal(gainNode);
        });

        describe('getFrequencyResponse()', function () {

            it('should throw an NotSupportedError', function (done) {
                var iIRFilterNode = offlineAudioContext.createIIRFilter([ 1 ], [ 1 ]);

                try {
                    iIRFilterNode.getFrequencyResponse(new Float32Array([ 1 ]), new Float32Array(0), new Float32Array(1));
                } catch (err) {
                    expect(err.code).to.equal(9);
                    expect(err.name).to.equal('NotSupportedError');

                    done();
                }
            });

            it('should throw an NotSupportedError', function (done) {
                var iIRFilterNode = offlineAudioContext.createIIRFilter([ 1 ], [ 1 ]);

                try {
                    iIRFilterNode.getFrequencyResponse(new Float32Array([ 1 ]), new Float32Array(1), new Float32Array(0));
                } catch (err) {
                    expect(err.code).to.equal(9);
                    expect(err.name).to.equal('NotSupportedError');

                    done();
                }
            });

            it('should fill the magResponse and phaseResponse arrays', function () {
                var iIRFilterNode = offlineAudioContext.createIIRFilter([ 1 ], [ 1 ]),
                    magResponse = new Float32Array(5),
                    phaseResponse = new Float32Array(5);

                iIRFilterNode.getFrequencyResponse(new Float32Array([ 200, 400, 800, 1600, 3200 ]), magResponse, phaseResponse);

                expect(Array.from(magResponse)).to.deep.equal([ 1, 1, 1, 1, 1 ]);
                expect(Array.from(phaseResponse)).to.deep.equal([ 0, 0, 0, 0, 0 ]);
            });

            it('should fill the magResponse and phaseResponse arrays ... for some other values', function () {
                var iIRFilterNode = offlineAudioContext.createIIRFilter([ 1, -1 ], [ 1, -0.5 ]),
                    magResponse = new Float32Array(5),
                    phaseResponse = new Float32Array(5);

                iIRFilterNode.getFrequencyResponse(new Float32Array([ 200, 400, 800, 1600, 3200 ]), magResponse, phaseResponse);

                expect(Array.from(magResponse)).to.deep.equal([ 0.056942202150821686, 0.11359700560569763, 0.2249375581741333, 0.43307945132255554, 0.7616625428199768 ]);
                expect(Array.from(phaseResponse)).to.deep.equal([ 1.5280766487121582, 1.4854952096939087, 1.401282548904419, 1.2399859428405762, 0.9627721309661865 ]);
            });

        });

    });

    describe('decodeAudioData()', function () {

        it('should return a promise', function () {
            expect(offlineAudioContext.decodeAudioData()).to.be.an.instanceOf(Promise);
        });

        describe('without a valid arrayBuffer', function () {

            it('should throw an error', function (done) {
                offlineAudioContext
                    .decodeAudioData(null)
                    .catch(function (err) {
                        expect(err.code).to.equal(9);
                        expect(err.name).to.equal('NotSupportedError');

                        done();
                    });
            });

            it('should call the errorCallback with an error', function (done) {
                offlineAudioContext.decodeAudioData(null, function () {}, function (err) {
                    expect(err.code).to.equal(9);
                    expect(err.name).to.equal('NotSupportedError');

                    done();
                });
            });

            // The promise is rejected before but the errorCallback gets called synchronously.
            it('should call the errorCallback before the promise gets rejected', function (done) {
                var errorCallback = spy();

                offlineAudioContext
                    .decodeAudioData(null, function () {}, errorCallback)
                    .catch(function () {
                        expect(errorCallback).to.have.been.calledOnce;

                        done();
                    });
            });

        });

        describe('with an arrayBuffer of an unsupported file', function () {

            var arrayBuffer;

            beforeEach(function (done) {
                this.timeout(5000);

                // PNG files are not supported by any browser :-)
                loadFixture('one-pixel-of-transparency.png', function (err, rrBffr) {
                    expect(err).to.be.null;

                    arrayBuffer = rrBffr;

                    done();
                });
            });

            it('should throw an error', function (done) {
                offlineAudioContext
                    .decodeAudioData(arrayBuffer)
                    .catch(function (err) {
                        expect(err.code).to.equal(0);
                        expect(err.name).to.equal('EncodingError');

                        done();
                    });
            });

            it('should call the errorCallback with an error', function (done) {
                offlineAudioContext.decodeAudioData(arrayBuffer, function () {}, function (err) {
                    expect(err.code).to.equal(0);
                    expect(err.name).to.equal('EncodingError');

                    done();
                });
            });

            // The promise is rejected before but the errorCallback gets called synchronously.
            it('should call the errorCallback before the promise gets rejected', function (done) {
                var errorCallback = spy();

                offlineAudioContext
                    .decodeAudioData(arrayBuffer, function () {}, errorCallback)
                    .catch(function () {
                        expect(errorCallback).to.have.been.calledOnce;

                        done();
                    });
            });

        });

        describe('with an arrayBuffer of a supported file', function () {

            var arrayBuffer;

            beforeEach(function (done) {
                this.timeout(5000);

                loadFixture('1000-frames-of-noise.wav', function (err, rrBffr) {
                    expect(err).to.be.null;

                    arrayBuffer = rrBffr;

                    done();
                });
            });

            it('should resolve to an instance of the AudioBuffer interface', function () {
                return offlineAudioContext
                    .decodeAudioData(arrayBuffer)
                    .then(function (audioBuffer) {
                        expect(audioBuffer.duration).to.be.closeTo(1000 / 44100, 0.001);
                        expect(audioBuffer.length).to.equal(1000);
                        expect(audioBuffer.numberOfChannels).to.equal(2);
                        expect(audioBuffer.sampleRate).to.equal(44100);

                        expect(audioBuffer.getChannelData).to.be.a('function');
                        expect(audioBuffer.copyFromChannel).to.be.a('function');
                        expect(audioBuffer.copyToChannel).to.be.a('function');
                    });
            });

            it('should call the successCallback with an instance of the AudioBuffer interface', function (done) {
                offlineAudioContext.decodeAudioData(arrayBuffer, function (audioBuffer) {
                    expect(audioBuffer.duration).to.be.closeTo(1000 / 44100, 0.001);
                    expect(audioBuffer.length).to.equal(1000);
                    expect(audioBuffer.numberOfChannels).to.equal(2);
                    expect(audioBuffer.sampleRate).to.equal(44100);

                    expect(audioBuffer.getChannelData).to.be.a('function');
                    expect(audioBuffer.copyFromChannel).to.be.a('function');
                    expect(audioBuffer.copyToChannel).to.be.a('function');

                    done();
                });
            });

            // The promise is resolved before but the successCallback gets called synchronously.
            it('should call the successCallback before the promise gets resolved', function () {
                var successCallback = spy();

                return offlineAudioContext
                    .decodeAudioData(arrayBuffer, successCallback)
                    .then(function () {
                        expect(successCallback).to.have.been.calledOnce;
                    });
            });

        });

    });

    describe('startRendering()', function () {

        it('should return a promise', function () {
            expect(offlineAudioContext.startRendering()).to.be.an.instanceOf(Promise);
        });

    });

    // describe('suspend()', function () {
    //
    //     it('should suspend the render process at the render quantum', function (done) {
    //         offlineAudioContext
    //             .suspend(Math.floor(Math.random() * 128) / offlineAudioContext.sampleRate)
    //             .then(() => {
    //                 expect(offlineAudioContext.currentTime).to.equal(0);
    //
    //                 offlineAudioContext.resume();
    //
    //                 done();
    //             });
    //
    //         offlineAudioContext.startRendering();
    //     });
    //
    //     it('should not allow to suspend the render process more than once at the render quantum', function (done) {
    //         offlineAudioContext
    //             .suspend(Math.floor(Math.random() * 128) / offlineAudioContext.sampleRate)
    //             .then(() => offlineAudioContext.resume());
    //
    //         offlineAudioContext
    //             .suspend(Math.floor(Math.random() * 128) / offlineAudioContext.sampleRate)
    //             .catch((err) => {
    //                 expect(err.code).to.equal(11);
    //                 expect(err.name).to.equal('InvalidStateError');
    //
    //                 done();
    //             });
    //
    //         offlineAudioContext.startRendering();
    //     });
    //
    // });

});
