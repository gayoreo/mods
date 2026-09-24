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
		'render': {
			'target': {
				'type': 'METHOD',
				'class': 'net.minecraft.client.renderer.blockentity.StructureBlockRenderer',
				'methodName': 'm_6922_',
				'methodDesc': '(Lnet/minecraft/world/level/block/entity/BlockEntity;FLcom/mojang/blaze3d/vertex/PoseStack;Lnet/minecraft/client/renderer/MultiBufferSource;II)V'
			},
			'transformer': render
		}
	}	
}

function render(method) {
	var instructions = method.instructions;
	var insn = instructions.get(0);

	instructions.insertBefore(insn, new VarInsnNode(Opcodes.ALOAD, 1)); // load structureBlockEntity
	instructions.insertBefore(insn, new VarInsnNode(Opcodes.ALOAD, 3)); // load posStack
	instructions.insertBefore(insn, new VarInsnNode(Opcodes.ALOAD, 4)); // load buffer
	instructions.insertBefore(insn, new MethodInsnNode(Opcodes.INVOKESTATIC, 'com/legacy/structure_gel/core/asm_hooks/StructureBlockRendererHooks', 'renderName', '(Lnet/minecraft/world/level/block/entity/BlockEntity;Lcom/mojang/blaze3d/vertex/PoseStack;Lnet/minecraft/client/renderer/MultiBufferSource;)V'));
	ASMAPI.log('INFO', '[Structure Gel] Transformed StructureBlockRenderer.render');
	return method;
}
