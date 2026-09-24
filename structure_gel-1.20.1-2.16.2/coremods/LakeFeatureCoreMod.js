var Opcodes = Java.type('org.objectweb.asm.Opcodes');
var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');
var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
var FieldInsnNode = Java.type('org.objectweb.asm.tree.FieldInsnNode');
var JumpInsnNode = Java.type('org.objectweb.asm.tree.JumpInsnNode');
var LabelNode = Java.type('org.objectweb.asm.tree.LabelNode');

var ASMAPI = Java.type('net.minecraftforge.coremod.api.ASMAPI');

function initializeCoreMod() {
	return {
		'place': {
			'target': {
				'type': 'METHOD',
				'class': 'net.minecraft.world.level.levelgen.feature.LakeFeature',
				'methodName': 'm_142674_',
				'methodDesc': '(Lnet/minecraft/world/level/levelgen/feature/FeaturePlaceContext;)Z'
			},
			'transformer': place
		}
	}	
}

function place(method) {
	var instructions = method.instructions;
	var insn = ASMAPI.findFirstMethodCall(method, ASMAPI.MethodType.VIRTUAL, 'net/minecraft/core/BlockPos', ASMAPI.mapMethod('m_6625_'), '(I)Lnet/minecraft/core/BlockPos;');
	var index = instructions.indexOf(insn);
	insn = instructions.get(index + 2);

	// Label that will be used later
	var label = new LabelNode();

	// Do "if" check
	instructions.insertBefore(insn, new VarInsnNode(Opcodes.ALOAD, 1));
	instructions.insertBefore(insn, new MethodInsnNode(Opcodes.INVOKESTATIC, 'com/legacy/structure_gel/core/asm_hooks/LakeFeatureHooks', 'checkForStructures', '(Lnet/minecraft/world/level/levelgen/feature/FeaturePlaceContext;)Z'));
	// If true, continue. If false, skip to "label"
	instructions.insertBefore(insn, new JumpInsnNode(Opcodes.IFEQ, label));
	// Load "false" boolean and return it
	instructions.insertBefore(insn, new InsnNode(Opcodes.ICONST_0));
	instructions.insertBefore(insn, new InsnNode(Opcodes.IRETURN));
	// Label to jump to if false
	instructions.insertBefore(insn, label);
	ASMAPI.log('INFO', '[Structure Gel] Transformed LakeFeature.place');
	return method;
}
