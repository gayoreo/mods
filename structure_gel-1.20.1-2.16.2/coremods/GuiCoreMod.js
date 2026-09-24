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
		'renderPortalOverlay': {
			'target': {
				'type': 'METHOD',
				'class': 'net.minecraft.client.gui.Gui',
				'methodName': 'm_93007_',
				'methodDesc': '(F)V'
			},
			'transformer': renderPortalOverlay
		}
	}	
}

function renderPortalOverlay(method) {
	var instructions = method.instructions;
	var insn = instructions.get(0);

	var label = new LabelNode();

	instructions.insertBefore(insn, new VarInsnNode(Opcodes.FLOAD, 1)); // load ticksInPortal
	instructions.insertBefore(insn, new VarInsnNode(Opcodes.ALOAD, 0)); // load this
	instructions.insertBefore(insn, new FieldInsnNode(Opcodes.GETFIELD, 'net/minecraft/client/gui/Gui', ASMAPI.mapField('f_92978_'), 'I')); // load screenHeight
	instructions.insertBefore(insn, new VarInsnNode(Opcodes.ALOAD, 0)); // load this
	instructions.insertBefore(insn, new FieldInsnNode(Opcodes.GETFIELD, 'net/minecraft/client/gui/Gui', ASMAPI.mapField('f_92977_'), 'I')); // load screenWidth
	instructions.insertBefore(insn, new MethodInsnNode(Opcodes.INVOKESTATIC, 'com/legacy/structure_gel/core/asm_hooks/GuiHooks', 'renderGelPortalOverlay', '(FII)Z'));
	instructions.insertBefore(insn, new JumpInsnNode(Opcodes.IFEQ, label));
	instructions.insertBefore(insn, new InsnNode(Opcodes.RETURN));
	instructions.insertBefore(insn, label);
	ASMAPI.log('INFO', '[Structure Gel] Transformed Gui.renderPortalOverlay');
	return method;
}
